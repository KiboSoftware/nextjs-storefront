const updateSubscriptionNextOrderDateMutation = /* GraphQL */ `
  mutation updateSubscriptionNextOrderDate(
    $subscriptionId: String!
    $subscriptionNextOrderDateInput: SubscriptionNextOrderDateInput
  ) {
    subscription: updateSubscriptionNextOrderDate(
      subscriptionId: $subscriptionId
      subscriptionNextOrderDateInput: $subscriptionNextOrderDateInput
    ) {
      nextOrderDate
    }
  }
`

export default updateSubscriptionNextOrderDateMutation
