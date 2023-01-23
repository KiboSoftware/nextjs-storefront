const updateCheckoutPaymentActionMutation = /* GraphQL */ `
  mutation updateCheckoutPaymentAction(
    $checkoutId: String!
    $paymentId: String!
    $paymentActionInput: PaymentActionInput
  ) {
    updateCheckoutPaymentAction(
      checkoutId: $checkoutId
      paymentId: $paymentId
      paymentActionInput: $paymentActionInput
    ) {
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
