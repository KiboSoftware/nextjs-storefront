import React, { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'

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

// Create params object to add payment method or to void it
const createParams = (params: Params): Response => {
  const { checkout, orderId, payerId } = params

  const variables = buildPayPalPaymentActionForCheckoutParams(
    CurrencyCode.US,
    checkout,
    undefined,
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

// Create shipping address
const getShippingAddress = (checkout: CrOrder) => {
  return {
    address_line_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address1 || '',
    address_line_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.address2 || '',
    admin_area_1: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.cityOrTown || '',
    admin_area_2: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.stateOrProvince || '',
    postal_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.postalOrZipCode,
    country_code: checkout?.fulfillmentInfo?.fulfillmentContact?.address?.countryCode,
  }
}

// Create breakdown object to pass to PayPal API
type ArrOfDiscounts = { id?: number; name?: string; impact: number }[]
const calculateDiscount = (arrOfDiscounts: ArrOfDiscounts) => {
  if (!arrOfDiscounts) {
    return 0
  }

  const discount = arrOfDiscounts.reduce((sum, discount) => {
    if (!discount.impact) {
      return sum
    }
    return sum + discount.impact
  }, 0)

  return discount
}

// Create payment_source to pass to PayPal API
const getPaymentSource = (checkout: CrOrder) => {
  const url = process.env.NEXT_PUBLIC_URL || ''
  const returnUrl = `${url}/checkout/${checkout.id}`
  const cancelUrl = `${url}/checkout/${checkout.id}`

  return {
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
}

const getBreakdown = (checkout: CrOrder, currency: string) => {
  const allShippingDiscounts = orderGetters.getShippingDiscounts(
    checkout as CrOrder
  ) as ArrOfDiscounts
  const shippingDiscounts = calculateDiscount(allShippingDiscounts)

  const allOrderDiscounts = orderGetters.getOrderDiscounts(checkout as CrOrder) as ArrOfDiscounts
  const orderDiscounts = calculateDiscount(allOrderDiscounts)

  return {
    item_total: {
      currency_code: currency,
      value: checkout.items?.length,
    },
    shipping: {
      currency_code: currency,
      value: checkout.shippingTotal,
    },
    handling: {
      currency_code: currency,
      value: checkout.handlingTotal,
    },
    tax_total: {
      currency_code: currency,
      value: checkout.taxTotal,
    },
    insurance: {
      currency_code: currency,
      value: 0,
    },
    shipping_discount: {
      currency_code: currency,
      value: shippingDiscounts,
    },
    discount: {
      currency_code: currency,
      value: orderDiscounts,
    },
  }
}

// Component
const PayPalButton = (props: PayPalButtonProps) => {
  const { publicRuntimeConfig } = getConfig()
  const { clientId, currency, intent } = publicRuntimeConfig.paypal

  const { t } = useTranslation('common')
  const { checkout, setSelectedPaymentTypeRadio, onAddPayment, onVoidPayment } = props

  const [isScriptLoaded, setIsScriptLoaded] = useState(true)
  const { setStepStatusValid, setStepStatusIncomplete } = useCheckoutStepContext()

  const activePaymentId = orderGetters.getSelectedPaymentType(checkout)?.id as string
  const isPayPalPaymentMethodAdded = orderGetters.isPayPalPaymentMethodActive(checkout)

  const payment_source = getPaymentSource(checkout)
  const breakdown = getBreakdown(checkout, currency)

  const url = process.env.NEXT_PUBLIC_URL || ''

  const initialOptions = {
    clientId,
    currency,
    intent,
  }

  const body = {
    intent: 'AUTHORIZE',
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: checkout.total,
          beakdown: breakdown,
        },
        shipping: {
          address: getShippingAddress(checkout),
        },
      },
    ],
    payment_source,
  }

  const createOrder = async () => {
    try {
      const response = await fetch(`${url}/api/paypal-create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const order = await response.json()

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
          {t('remove-payPal')}
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
            <p>{t('loading-paypal')}</p>
          )}
        </PayPalScriptProvider>
      )}
    </div>
  )
}

export default PayPalButton
