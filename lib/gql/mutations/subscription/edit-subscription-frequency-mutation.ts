const EditSubscriptionFrequencyMutation = /* GraphQL */ `
  mutation updateSubscriptionFrequency(
    $subscriptionId: String!
    $frequencyInput: SBFrequencyInput
  ) {
    subscription: updateSubscriptionFrequency(
      subscriptionId: $subscriptionId
      frequencyInput: $frequencyInput
    ) {
      frequency {
        unit
        value
      }
    }
  }
`

export default EditSubscriptionFrequencyMutation
