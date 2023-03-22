[next-storefront](../README.md) / useUpdateSubscriptionState

# Module: useUpdateSubscriptionState

## Table of contents

### Functions

- [useUpdateSubscriptionState](useUpdateSubscriptionState.md#useupdatesubscriptionstate)

## Functions

### useUpdateSubscriptionState

▸ **useUpdateSubscriptionState**(): `Object`

[Mutation hook] useUpdateSubscriptionState uses the graphQL mutation

<b>performSubscriptionAction(subscriptionId: string subscriptionActionInput: SubscriptionActionInput): Subscription</b>

Description : Pause subscription order according to the actionName.

Parameters passed to function performSubscriptionAction(props: PerformSubscriptionActionProps) => expects object of type 'PerformSubscriptionActionProps' containing subscriptionId and SubscriptionActionInput

On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.

#### Returns

`Object`

'response?.subscription' which contains object of Subscription

| Name | Type |
| :------ | :------ |
| `updateSubscriptionState` | `UseMutationResult`<`any`, `unknown`, `PerformSubscriptionActionProps`, `unknown`\> |

#### Defined in

[mutations/subscription/useUpdateSubscriptionState/useUpdateSubscriptionState.ts:39](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useUpdateSubscriptionState/useUpdateSubscriptionState.ts#L39)
