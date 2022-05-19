import React, { useEffect } from 'react'

import { Action } from '../DetailsStep/DetailsStep'

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

    if (stepperStatus === 'VALIDATE') {
      onCompleteCallback({ type: 'COMPLETE' })
    }
  }, [stepperStatus])
  return (
    <div data-testid="checkout-shipping">
      <b>Shipping</b>
    </div>
  )
}

export default ShippingStep
