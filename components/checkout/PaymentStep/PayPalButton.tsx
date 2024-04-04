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
  const { checkout, setSelectedPaymentTypeRadio, onAddPayment, onVoidPayment, paypalBearerToken } =
    props

  const [isScriptLoaded, setIsScriptLoaded] = useState(true)
  const { setStepStatusValid, setStepStatusIncomplete } = useCheckoutStepContext()
  const paypalRequestId = uuidv4()
  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || 'USD'

  const paypalUrl = process.env.NEXT_PUBLIC_PAYPAL_URL || 'https://api-m.sandbox.paypal.com'
  const returnUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${checkout.id}?step=payment`
  const cancelUrl = `${process.env.NEXT_PUBLIC_URL}/checkout/${checkout.id}?step=payment`

  const activePaymentId = orderGetters.getSelectedPaymentType(checkout)?.id as string
  const isPayPalPaymentMethodAdded = orderGetters.isPayPalPaymentMethodActive(checkout)

  const address = {
    address_line_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address1,
    address_line_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address2,
    admin_area_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.cityOrTown,
    admin_area_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.stateOrProvince,
    postal_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.postalOrZipCode,
    country_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.countryCode,
  }

  const payment_source = {
    paypal: {
      experience_context: {
        payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
        brand_name: 'KIBO Commerce',
        locale: 'en-US',
        landing_page: 'LOGIN',
        shipping_preference: 'SET_PROVIDED_ADDRESS',
        user_action: 'PAY_NOW',
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    },
  }

  const createOrder = async () => {
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
      payment_source,
    }

    try {
      const response = await fetch(`${paypalUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'PayPal-Request-Id': paypalRequestId,
          Authorization: `Bearer ${paypalBearerToken}`,
        },
        body: JSON.stringify(body),
      })

      const order = await response.json()
      console.log(`Paypal order: ${order.id} created successfully...`)

      return order.id
    } catch (error) {
      console.error('Error creating paypal REST order', error)
      throw error
    }
  }

  const onApprove = async (data: any) => {
    const { orderID, payerID } = data

    const body = {
      payment_source,
    }

    try {
      const response = await fetch(
        `${paypalUrl}/v2/checkout/orders/${orderID}/confirm-payment-source`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${paypalBearerToken}`,
          },
          body: JSON.stringify(body),
        }
      )
      await response.json()

      console.log(`Paypal order: ${orderID}, payerID:${payerID} confirmed successfully...`)

      await voidActivePayment()
      await addPaymentMethod(orderID, payerID)
    } catch (error) {
      console.error(`Error while confirming paypal order: ${orderID}`, error)
      throw error
    }
  }

  const addPaymentMethod = async (orderId: string, payerId: string) => {
    const { paymentActionToBeAdded } = createParams({
      checkout,
      orderId,
      payerId,
    })

    await onAddPayment(checkout.id as string, paymentActionToBeAdded)

    console.log(`Payment method added successfully...`)

    setSelectedPaymentTypeRadio(PaymentType.PAYPALEXPRESS2)
    setStepStatusValid()
  }

  const voidActivePayment = async () => {
    const checkoutId = checkout.id as string

    const { paymentActionToBeVoided } = createParams({
      checkout,
      orderId: activePaymentId,
      payerId: '',
    })

    // void payment
    if (activePaymentId) {
      await onVoidPayment(checkoutId, activePaymentId, paymentActionToBeVoided)
      console.log(`Payment method voided successfully...`)
    }

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
