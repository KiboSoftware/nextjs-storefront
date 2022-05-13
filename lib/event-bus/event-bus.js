export const eventBus = {
  on: (event, callback) => {
    document.addEventListener(event, callback)
  },
  remove: (event, callback) => {
    document.removeEventListener(event, callback)
  },
  dispatch: (event, data) => {
    document.dispatchEvent(new Event(event, { detail: data }))
  },
}

export const events = {
  CHECKOUT_VALIDATE_DETAILS_STEP: 'checkout_validate_details_step',
  CHECKOUT_VALIDATE_SHIPPING_STEP: 'checkout_validate_shipping_step',
  CHECKOUT_VALIDATE_PAYMENT_STEP: 'checkout_validate_payment_step',
}
