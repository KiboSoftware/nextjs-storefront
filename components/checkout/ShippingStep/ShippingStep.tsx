import React, { useEffect } from 'react'

import type { Action } from '@/components/checkout'
import { FormStates } from '@/lib/constants'

import type { Order } from '@/lib/gql/types'
interface ShippingProps {
  setAutoFocus?: boolean
  stepperStatus: string
  checkout: Order | undefined
  onCompleteCallback: (action: Action) => void
}

const ShippingStep = (props: ShippingProps) => {
  const { stepperStatus, onCompleteCallback } = props

  useEffect(() => {
    // if form is valid, onSubmit callback
    if (stepperStatus === FormStates.VALIDATE) {
      onCompleteCallback({ type: FormStates.COMPLETE })
    }
  }, [stepperStatus])
  return (
    <div data-testid="checkout-shipping">
      <b>Shipping</b>
    </div>
  )
}

export default ShippingStep
