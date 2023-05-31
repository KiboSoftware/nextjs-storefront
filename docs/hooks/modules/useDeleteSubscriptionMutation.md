[next-storefront](../README.md) / useDeleteSubscriptionMutation

# Module: useDeleteSubscriptionMutation

## Table of contents

### Functions

- [useDeleteSubscriptionMutation](useDeleteSubscriptionMutation.md#usedeletesubscriptionmutation)

## Functions

### useDeleteSubscriptionMutation

▸ **useDeleteSubscriptionMutation**(): `Object`

[Mutation hook] useDeleteSubscriptionMutation uses the graphQL mutation

<b>deleteSubscription(subscriptionId: string, subscriptionItemId: string, subscriptionReasonInput: SubscriptionReasonInput): Subscription</b>

Description : Delete subscription order according to the actionName.

Parameters passed to function deleteSubscription(props: DeleteSubscriptionProps) => expects object of type 'DeleteSubscriptionProps' containing subscriptionId, subscriptionItemId and subscriptionReasonInput

On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.

#### Returns

`Object`

'response?.subscription' which contains object of Subscription

| Name                 | Type                                                                         |
| :------------------- | :--------------------------------------------------------------------------- |
| `deleteSubscription` | `UseMutationResult`<`any`, `unknown`, `DeleteSubscriptionProps`, `unknown`\> |

#### Defined in

[mutations/subscription/useDeleteSubscription/useDeleteSubscription.ts:42](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useDeleteSubscription/useDeleteSubscription.ts#L42)
