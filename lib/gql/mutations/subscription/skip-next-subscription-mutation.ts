import { baseSkipSubscriptionFragment, subscriptionItemFragment } from '@/lib/gql/fragments'

const skipNextSubscriptionMutation = /* GraphQL */ `
  mutation skipNextSubscription($subscriptionId: String!) {
    subscription: skipNextSubscription(subscriptionId: $subscriptionId) {
      ...baseSkipSubscriptionFragment
      items {
        ...subscriptionItemFragment
      }
      frequency {
        unit
        value
      }
    }
  }
  ${baseSkipSubscriptionFragment}
  ${subscriptionItemFragment}
`

export default skipNextSubscriptionMutation
