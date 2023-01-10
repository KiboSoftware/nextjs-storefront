const orderSubscriptionNow = /* GraphQL */ `
  mutation orderSubscriptionNow($subscriptionId: String!) {
    orderSubscriptionNow(subscriptionId: $subscriptionId) {
      id
    }
  }
`

export default orderSubscriptionNow
