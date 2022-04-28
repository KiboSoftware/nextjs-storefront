import React, { forwardRef, useImperativeHandle } from 'react'

interface PaymentHandler {
  validateForm: () => void
}

const Payment = forwardRef<PaymentHandler, any>((_props, ref) => {
  const validateForm = () => {
    console.log('validating Payment form')
  }
  useImperativeHandle(ref, () => ({
    validateForm,
  }))

  return (
    <div>
      <b>Payment</b>
    </div>
  )
})

export default Payment
Payment.displayName = 'Payment'
