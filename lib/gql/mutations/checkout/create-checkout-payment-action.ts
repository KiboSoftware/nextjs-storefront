const createCheckoutPaymentActionMutation = /* GraphQL */ `
  mutation checkoutPaymentAction($checkoutId: String!, $paymentAction: PaymentActionInput) {
    createCheckoutPaymentAction(checkoutId: $checkoutId, paymentActionInput: $paymentAction) {
      id
      originalCartId
      destinations {
        id
        data
      }
      total
      subTotal
    }
  }
`

export default createCheckoutPaymentActionMutation
