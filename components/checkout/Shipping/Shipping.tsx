import React, { forwardRef, useImperativeHandle } from 'react'

interface ShippingHandler {
  validateForm: () => void
}

const Shipping = forwardRef<ShippingHandler, any>((props, ref) => {
  const validateForm = () => {
    console.log('validating Shipping form')
  }
  useImperativeHandle(ref, () => ({
    validateForm,
  }))

  return (
    <div>
      <b>Shipping</b>
    </div>
  )
})

export default Shipping
Shipping.displayName = 'Shipping'
