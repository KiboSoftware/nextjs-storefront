import { SubscriptionReason } from '@/lib/gql/types'

export const subscriptionPauseMock: { subscription: SubscriptionReason } = {
  subscription: {
    actionName: 'Pause',
  },
}
