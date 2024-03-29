import React from 'react'

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
  } = props

  const { setStepStatusValid, setStepStatusIncomplete } = useCheckoutStepContext()
  const payPalRequestId = uuidv4()
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD'

  const url = process.env.NEXT_PUBLIC_PAYPAL_URL || 'https://api-m.sandbox.paypal.com'
  const returnUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${checkout.id}?step=payment`
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${checkout.id}?step=payment`

  const isPaymentMethodAdded = paypalDetails?.orderId && paypalDetails?.payerId

  const address = {
    address_line_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address1,
    address_line_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address2,
    admin_area_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.addressType,
    admin_area_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.cityOrTown,
    postal_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.postalOrZipCode,
    country_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.countryCode,
  }

  const createOrder = () => {
    return fetch(`${url}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': payPalRequestId,
        Authorization: `Bearer ${paypalBearerToken}`,
      },
      body: JSON.stringify({
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
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        console.log(`Paypal order: ${order.id} created successfully...`)
        return order.id
      })
      .catch((error) => {
        console.error('Error creating paypal order', error)
        throw error
      })
  }

  const onApprove = (data: { orderID: string }) => {
    return fetch(`${url}/v2/checkout/orders/${data.orderID}/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': payPalRequestId,
        Authorization: `Bearer ${paypalBearerToken}`,
      },
    })
      .then((response) => response.json())
      .then(async (orderData) => {
        await voidActivePayment()
        await addPaymentMethod(orderData.id, orderData.payer.payer_id)
        console.log(`Paypal order: ${orderData.id} approved successfully...`)
      })
      .catch((error) => {
        console.error('Error while approving paypal order', error)
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
    const activePaymentId = orderGetters.getSelectedPaymentType(checkout)?.id as string
    const { paymentActionToBeVoided } = createParams({
      checkout,
      orderId,
      payerId,
    })

    // void payment
    if (activePaymentId) await onVoidPayment(checkoutId, activePaymentId, paymentActionToBeVoided)
    setPaypalDetails(undefined)

    setSelectedPaymentTypeRadio(PaymentType.PAYPALEXPRESS2)
    setStepStatusIncomplete()
  }

  return (
    <div style={{ width: '200px', paddingBottom: '20px' }}>
      {isPaymentMethodAdded && (
        <Button variant="contained" color="primary" onClick={voidActivePayment}>
          Remove PayPal
        </Button>
      )}

      {!isPaymentMethodAdded && (
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: 'horizontal', color: 'gold', shape: 'rect', label: 'paypal' }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
      )}
    </div>
  )
}

export default PayPalButton
