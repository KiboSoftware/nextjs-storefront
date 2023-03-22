[next-storefront](../README.md) / useSkipNextSubscription

# Module: useSkipNextSubscription

## Table of contents

### Functions

- [useSkipNextSubscription](useSkipNextSubscription.md#useskipnextsubscription)

## Functions

### useSkipNextSubscription

▸ **useSkipNextSubscription**(): `Object`

[Mutation hook] useSkipNextSubscription uses the graphQL mutation

<b>skipNextSubscription(subscriptionId: string): Subscription</b>

Description : Skip the next subscription order according to the frequency unit and value.

Parameters passed to function skipNextSubscription(subscriptionId?: string | null) => expects subscriptionId

#### Returns

`Object`

'response?.subscription' which contains next order date when the order will be placed

| Name | Type |
| :------ | :------ |
| `skipNextSubscription` | `UseMutationResult`<`any`, `unknown`, `undefined` \| ``null`` \| `string`, `unknown`\> |

#### Defined in

[mutations/subscription/useSkipNextSubscription/useSkipNextSubscription.ts:32](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useSkipNextSubscription/useSkipNextSubscription.ts#L32)
