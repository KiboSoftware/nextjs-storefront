export const buildPauseSubscriptionParams = (subscriptionId: string) => {
  return {
    subscriptionId: subscriptionId,
    subscriptionActionInput: {
      actionName: 'Pause',
      reasons: {
        actionName: 'Pause',
      },
    },
  }
}

export const buildCancelSubscriptionParams = (
  subscriptionId: string,
  subscriptionItemId: string
) => {
  return {
    subscriptionId: subscriptionId,
    subscriptionItemId: subscriptionItemId,
    subscriptionReasonInput: {
      actionName: 'cancel',
      reasonCode: 'cancel',
      description: 'cancel',
      moreInfo: 'cancel',
    },
  }
}
