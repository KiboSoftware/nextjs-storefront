const deleteSubscriptionMutation = /* GraphQL */ `
  mutation deleteSubscriptionItem(
    $subscriptionId: String!
    $subscriptionItemId: String!
    $subscriptionReasonInput: SubscriptionReasonInput
  ) {
    subscription: deleteSubscriptionItem(
      subscriptionId: $subscriptionId
      subscriptionItemId: $subscriptionItemId
      subscriptionReasonInput: $subscriptionReasonInput
    ) {
      reasons {
        actionName
        reasonCode
        description
        moreInfo
      }
    }
  }
`

export default deleteSubscriptionMutation
