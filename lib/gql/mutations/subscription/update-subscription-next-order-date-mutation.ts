const updateSubscriptionNextOrderDateMutation = /* GraphQL */ `
  mutation updateSubscriptionNextOrderDate(
    $subscriptionId: String!
    $subscriptionNextOrderDateInput: SubscriptionNextOrderDateInput
  ) {
    updateSubscriptionNextOrderDate(
      subscriptionId: $subscriptionId
      subscriptionNextOrderDateInput: $subscriptionNextOrderDateInput
    ) {
      nextOrderDate
    }
  }
`

export default updateSubscriptionNextOrderDateMutation
