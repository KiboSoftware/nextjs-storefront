[next-storefront](../README.md) / useUpdateSubscriptionNextOrderDate

# Module: useUpdateSubscriptionNextOrderDate

## Table of contents

### Functions

- [useUpdateSubscriptionNextOrderDate](useUpdateSubscriptionNextOrderDate.md#useupdatesubscriptionnextorderdate)

## Functions

### useUpdateSubscriptionNextOrderDate

▸ **useUpdateSubscriptionNextOrderDate**(): `Object`

[Mutation hook] useUpdateSubscriptionNextOrderDate uses the graphQL mutation

<b>updateSubscriptionNextOrderDate(subscriptionId: String!, subscriptionNextOrderDateInput: SubscriptionNextOrderDateInput): Subscription</b>

Description : Update subscription next order date.

Parameters passed to function updateSubscriptionNextOrderDate(subscriptionId: string, subscriptionNextOrderDateInput: { nextOrderDate: string  }) => expects subscriptionId and nextOrderDate

#### Returns

`Object`

'response?.subscription.nextOrderDate' which contains next order date when the order will be placed

| Name | Type |
| :------ | :------ |
| `updateSubscriptionNextOrderDate` | `UseMutationResult`<`any`, `unknown`, `UpdateSubscriptionNextOrderDateProps`, `unknown`\> |

#### Defined in

[mutations/subscription/useUpdateSubscriptionNextOrderDate/useUpdateSubscriptionNextOrderDate.ts:39](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useUpdateSubscriptionNextOrderDate/useUpdateSubscriptionNextOrderDate.ts#L39)
