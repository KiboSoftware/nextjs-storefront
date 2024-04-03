import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { v4 as uuidv4 } from 'uuid'

import { useCheckoutStepContext } from '@/context'
import { CurrencyCode, PaymentType } from '@/lib/constants'
import { orderGetters } from '@/lib/getters'
import { buildPayPalPaymentActionForCheckoutParams } from '@/lib/helpers'

import { CrOrder } from '@/lib/gql/types'

interface PayPalButtonProps {
  checkout: CrOrder
  setSelectedPaymentTypeRadio: (paymentType: PaymentType) => void
  onAddPayment: (checkoutId: string, paymentAction: any) => void
  onVoidPayment: (checkoutId: string, paymentId: string, paymentAction: any) => void
  paypalBearerToken: string
  paypalDetails: undefined | { orderId: string; payerId: string }
  setPaypalDetails: (details: { orderId: string; payerId: string } | undefined) => void
  checkoutPaymentType: PaymentType
}

type Params = {
  checkout: CrOrder
  orderId?: string
  payerId?: string
}

type Response = {
  paymentActionToBeAdded: any
  paymentActionToBeVoided: any
}

const initialOptions = {
  clientId: 'test',
  currency: 'USD',
  intent: 'authorize',
}

const createParams = (params: Params): Response => {
  const { checkout, orderId, payerId } = params

  const variables = buildPayPalPaymentActionForCheckoutParams(
    CurrencyCode.US,
    checkout,
    undefined, // selectedPaymentMethod?.billingAddressInfo?.contact as CrContact,
    // true, // isSameAsShipping,
    orderId as string,
    payerId as string
  )

  return {
    paymentActionToBeAdded: {
      ...variables,
      actionName: '',
    },
    paymentActionToBeVoided: {
      ...variables,
      actionName: 'VoidPayment',
    },
  }
}

const PayPalButton = (props: PayPalButtonProps) => {
  const {
    checkout,
    setSelectedPaymentTypeRadio,
    onAddPayment,
    onVoidPayment,
    paypalBearerToken,
    paypalDetails,
    setPaypalDetails,
    checkoutPaymentType,
  } = props

  const [isScriptLoaded, setIsScriptLoaded] = useState(true)
  const { setStepStatusValid, setStepStatusIncomplete } = useCheckoutStepContext()
  const payPalRequestId = uuidv4()
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD'

  const returnUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${checkout.id}?step=payment`
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${checkout.id}?step=payment`

  const activePaymentId = orderGetters.getSelectedPaymentType(checkout)?.id as string
  const isPayPalPaymentMethodAdded = orderGetters.isPayPalPaymentMethodActive(checkout)

  const address = {
    address_line_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address1,
    address_line_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address2,
    admin_area_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.addressType,
    admin_area_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.cityOrTown,
    postal_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.postalOrZipCode,
    country_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.countryCode,
  }

  const createOrder = () => {
    const url = `${
      process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
    }/api/paypal-create-order`

    const body = {
      intent: 'AUTHORIZE',
      purchase_units: [
        {
          reference_id: checkout.id,
          amount: { currency_code: currency, value: checkout.total },
          shipping: {
            address: address,
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            brand_name: 'Kibo Commerce',
            locale: 'en-US',
            landing_page: 'LOGIN',
            shipping_preference: 'SET_PROVIDED_ADDRESS',
            user_action: 'PAY_NOW',
            return_url: returnUrl,
            cancel_url: cancelUrl,
          },
        },
      },
    }

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': payPalRequestId,
        Authorization: `Bearer ${paypalBearerToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((order) => {
        console.log(`Paypal REST order: ${order.id} created successfully...`)
        return order.id
      })
      .catch((error) => {
        console.error('Error creating paypal REST order', error)
        throw error
      })
  }

  const onApprove = (data: { orderID: string }) => {
    const url = `${
      process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
    }/api/paypal-approve-order?orderId=${data.orderID}`

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': payPalRequestId,
      },
    })
      .then((response) => response.json())
      .then(async (orderData) => {
        await voidActivePayment()
        await addPaymentMethod(orderData.id, orderData.payer.payer_id)

        console.log(`Paypal order: ${orderData.id} approved successfully...`)
      })
      .catch((error) => {
        console.error(`Error while approving paypal order: ${data.orderID}`, error)
        throw error
      })
  }

  const addPaymentMethod = async (orderId: string, payerId: string) => {
    setPaypalDetails({ orderId, payerId })

    const { paymentActionToBeAdded } = createParams({
      checkout,
      orderId,
      payerId,
    })

    await onAddPayment(checkout.id as string, paymentActionToBeAdded)

    setSelectedPaymentTypeRadio(PaymentType.PAYPALEXPRESS2)
    setStepStatusValid()
  }

  const voidActivePayment = async () => {
    const orderId = paypalDetails?.orderId
    const payerId = paypalDetails?.orderId

    const checkoutId = checkout.id as string

    const { paymentActionToBeVoided } = createParams({
      checkout,
      orderId,
      payerId,
    })

    // void payment
    if (isPayPalPaymentMethodAdded)
      await onVoidPayment(checkoutId, activePaymentId, paymentActionToBeVoided)
    setPaypalDetails(undefined)

    setSelectedPaymentTypeRadio(PaymentType.PAYPALEXPRESS2)
    setStepStatusIncomplete()
  }

  useEffect(() => {
    const handleScriptLoad = () => {
      setIsScriptLoaded(true)
    }
    window.addEventListener('paypal:sdk:loaded', handleScriptLoad)
    return () => window.removeEventListener('paypal:sdk:loaded', handleScriptLoad)
  }, [])

  useEffect(() => {
    if (isPayPalPaymentMethodAdded) {
      setSelectedPaymentTypeRadio(PaymentType.PAYPALEXPRESS2)
      setStepStatusValid()
    }
  }, [isPayPalPaymentMethodAdded])

  return (
    <div style={{ width: '200px', paddingBottom: '20px' }}>
      {isPayPalPaymentMethodAdded && (
        <Button variant="contained" color="primary" onClick={voidActivePayment}>
          Remove PayPal
        </Button>
      )}

      {!isPayPalPaymentMethodAdded && (
        <PayPalScriptProvider options={{ components: 'buttons', ...initialOptions }}>
          {isScriptLoaded ? (
            <PayPalButtons
              style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'paypal' }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          ) : (
            <p>Loading PayPal...</p>
          )}
        </PayPalScriptProvider>
      )}
    </div>
  )
}

export default PayPalButton
