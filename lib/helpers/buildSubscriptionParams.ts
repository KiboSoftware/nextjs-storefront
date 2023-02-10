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
