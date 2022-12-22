const EditSubscriptionFrequencyMutation = /* GraphQL */ `
  mutation updateSubscriptionFrequency(
    $subscriptionId: String!
    $frequencyInput: SBFrequencyInput
  ) {
    updateSubscriptionFrequency(subscriptionId: $subscriptionId, frequencyInput: $frequencyInput) {
      frequency {
        unit
        value
      }
    }
  }
`

export default EditSubscriptionFrequencyMutation
