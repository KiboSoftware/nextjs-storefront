const updateCheckoutPaymentActionMutation = /* GraphQL */ `
  mutation checkoutPaymentAction($checkoutId: String!,paymentId: String!, $paymentAction: PaymentActionInput) {
    updateCheckoutPaymentAction(checkoutId: $checkoutId, paymentId: $paymentId, paymentActionInput: $paymentAction) {
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

export default updateCheckoutPaymentActionMutation
