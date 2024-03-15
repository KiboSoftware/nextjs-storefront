import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { useCheckoutStepContext } from '@/context'
import { CurrencyCode, PaymentType } from '@/lib/constants'
import { buildPayPalPaymentActionForCheckoutParams } from '@/lib/helpers'

import type { CrOrder, Checkout } from '@/lib/gql/types'

declare global {
  interface Window {
    paypal: any
  }
}

interface PayPalButtonProps {
  checkout: any
  setSelectedPaymentTypeRadio: (paymentType: PaymentType) => void
  onAddPayment: (checkoutId: string, paymentAction: any) => void
  onVoidPayment: (checkoutId: string, paymentId: string, paymentAction: any) => void
  merchantAccountId: string | null
}

type Params = {
  checkout: CrOrder | Checkout
  externalTransactionId: string
  payerId: string
}

type Response = {
  paymentActionToBeAdded: any
  paymentActionToBeVoided: any
  paymentId: any
}

const createParams = (params: Params): Response => {
  const { checkout, externalTransactionId, payerId } = params

  if (!externalTransactionId || !payerId)
    return {
      paymentActionToBeAdded: undefined,
      paymentActionToBeVoided: undefined,
      paymentId: undefined,
    }

  return {
    paymentActionToBeAdded: {
      ...buildPayPalPaymentActionForCheckoutParams(
        CurrencyCode.US,
        checkout,
        undefined, // selectedPaymentMethod?.billingAddressInfo?.contact as CrContact,
        // true, // isSameAsShipping,
        externalTransactionId,
        payerId
      ),
      actionName: '',
    },
    paymentActionToBeVoided: {},
    paymentId: '',
  }
}

const ADD_PAYMENT_METHOD = 'addPaymentMethod'
const MAKE_PAYMENT_METHOD_VOID = 'makePaymentMethodVoid'
const ENVIRONMENT = process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT
const URL = `${
  process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
}/api/paypal-token?isCart=false`

const PayPalButton = (props: PayPalButtonProps) => {
  const { checkout, setSelectedPaymentTypeRadio, onAddPayment, merchantAccountId } = props

  const [isPaymentMethodAdded, setIsPaymentMethodAdded] = useState<boolean>(false)
  const { setStepStatusValid, setStepStatusIncomplete } = useCheckoutStepContext()

  // Read query params after completing the payment
  const router = useRouter()
  const externalTransactionId = router.query?.token as string
  const payerId = router.query?.PayerID as string

  const isPayPalPaymentSuccessful = !!checkout?.id && !!externalTransactionId && !!payerId

  const showPayPalButton =
    !isPayPalPaymentSuccessful || (isPayPalPaymentSuccessful && !isPaymentMethodAdded)
  const showRemovePayPalButton = isPayPalPaymentSuccessful && isPaymentMethodAdded

  const updateQueryParams = () => {
    const { pathname, query } = router
    delete query.isCart
    delete query.token
    delete query.PayerID

    router.replace({ pathname, query }, undefined, { shallow: true })
  }

  const makePaymentMethodVoid = () => {
    updateQueryParams()
    setStepStatusIncomplete()

    handleLoad()
  }

  const addPaymentMethod = async (paymentActionToBeAdded: any) => {
    await onAddPayment(checkout.id, paymentActionToBeAdded)
    setIsPaymentMethodAdded(true)

    setSelectedPaymentTypeRadio(PaymentType.PAYPALEXPRESS2)
    setStepStatusValid()
  }

  const handlePayment = async (action: 'addPaymentMethod' | 'makePaymentMethodVoid') => {
    if (!checkout || !externalTransactionId || !payerId) return

    const { paymentActionToBeVoided, paymentActionToBeAdded } = createParams({
      checkout,
      externalTransactionId,
      payerId,
    })

    if (action === MAKE_PAYMENT_METHOD_VOID) makePaymentMethodVoid()
    if (action === ADD_PAYMENT_METHOD && paymentActionToBeAdded)
      addPaymentMethod(paymentActionToBeAdded)
  }

  // eslint-disable-next-line
  const handleLoad = (source?: string) => {
    source && console.log(`${source} loaded...`)
    const imgElement = document.getElementById('btn_xpressPaypal')

    if (!!imgElement) console.log('PayPal image button is not loaded...')
    if (!!window?.paypal) console.log('PayPal Checkout SDK not available...')

    console.log('Call paypalCheckoutReady...')
    if (imgElement && window?.paypal) paypalCheckoutReady()
  }

  const paypalCheckoutReady = () => {
    window.paypal?.checkout?.reset()
    window.paypal?.checkout.setup(merchantAccountId, {
      environment: ENVIRONMENT,
      click: async (event: any) => {
        event.preventDefault()
        setSelectedPaymentTypeRadio(PaymentType.PAYPALEXPRESS2)

        window.paypal.checkout.initXO()

        try {
          const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({ checkout }),
          })
          if (!response.ok) throw new Error('Network response was not ok')
          const resJson = await response.json()

          const redirectUrl = window.paypal.checkout.urlPrefix + resJson.token
          window.paypal.checkout.startFlow(redirectUrl)
        } catch (error) {
          console.error('Error:', error)
          window.paypal.checkout.closeFlow()
        }
      },
      button: ['btn_xpressPaypal'],
    })
  }

  useEffect(() => {
    handleLoad()
  }, [isPaymentMethodAdded])

  useEffect(() => {
    if (isPayPalPaymentSuccessful && !isPaymentMethodAdded) handlePayment(ADD_PAYMENT_METHOD)
    if (!isPayPalPaymentSuccessful) setIsPaymentMethodAdded(false)
  }, [isPayPalPaymentSuccessful])

  return (
    <>
      {showRemovePayPalButton && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePayment(MAKE_PAYMENT_METHOD_VOID)}
          >
            Remove PayPal
          </Button>
        </>
      )}
      {showPayPalButton && (
        <div id="paypal-button-container">
          <img
            id="btn_xpressPaypal"
            className="p-button"
            alt="Check out with PayPal"
            src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-medium.png"
            width="170px"
            height="32px"
            onLoad={() => handleLoad('image')}
          />

          <Script
            id="paypal-sdk"
            async
            src="https://www.paypalobjects.com/api/checkout.js"
            onLoad={() => handleLoad('script')}
          />
        </div>
      )}
    </>
  )
}

export default PayPalButton
