const updateSubscriptionPaymentMutation = /* GraphQL */ `
  mutation updateSubscriptionPayment(
    $subscriptionId: String!
    $updateMode: String
    $paymentInput: SBPaymentInput
  ) {
    subscription: updateSubscriptionPayment(
      subscriptionId: $subscriptionId
      updateMode: $updateMode
      paymentInput: $paymentInput
    ) {
      id
    }
  }
`

export default updateSubscriptionPaymentMutation
