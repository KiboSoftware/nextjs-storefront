const createCheckoutActionMutation = /* GraphQL */ `
  mutation createCheckoutAction($checkoutId: String!, $checkoutActionInput: CheckoutActionInput) {
    createCheckoutAction(checkoutId: $checkoutId, checkoutActionInput: $checkoutActionInput) {
      id
      originalCartId
      customerAccountId
      email
      subTotal
      shippingTaxTotal
      shippingTotal
      total
    }
  }
`

export default createCheckoutActionMutation
