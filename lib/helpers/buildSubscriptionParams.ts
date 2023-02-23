import { SbSubscriptionItem, Subscription } from '../gql/types'

export const buildPauseAndCancelSubscriptionParams = (
  subscriptionDetailsData: Subscription,
  actionName: string
) => {
  return {
    subscriptionId: subscriptionDetailsData.id as string,
    subscriptionActionInput: {
      actionName: actionName,
      reason: {
        actionName: actionName,
      },
    },
  }
}

export const buildCancelSubscriptionParams = (
  subscriptionDetailsData: Subscription,
  subscriptionItem: SbSubscriptionItem[]
) => {
  return {
    subscriptionId: subscriptionDetailsData?.id as string,
    subscriptionItemId: subscriptionItem[0]?.id as string,
    subscriptionReasonInput: {
      actionName: 'cancel',
      reasonCode: 'cancel',
      description: 'cancel',
      moreInfo: 'cancel',
    },
  }
}
