import { SbSubscriptionItem, Subscription } from '../gql/types'

export const buildPauseSubscriptionParams = (subscriptionDetailsData: Subscription) => {
  return {
    subscriptionId: subscriptionDetailsData.id as string,
    subscriptionActionInput: {
      actionName: 'Pause',
      reason: {
        actionName: 'Pause',
      },
    },
  }
}

export const buildCancelSubscriptionParams = (
  subscriptionDetailsData: Subscription,
  subscriptionItem: SbSubscriptionItem
) => {
  return {
    subscriptionId: subscriptionDetailsData.id as string,
    subscriptionItemId: subscriptionItem.id as string,
    subscriptionReasonInput: {
      actionName: 'cancel',
      reasonCode: 'cancel',
      description: 'cancel',
      moreInfo: 'cancel',
    },
  }
}
