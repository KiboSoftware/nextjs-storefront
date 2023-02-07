export const buildSubscriptionParams = (subscriptionId: string) => {
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
