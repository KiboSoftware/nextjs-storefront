[next-storefront](../README.md) / useUpdateSubscriptionShippingInfo

# Module: useUpdateSubscriptionShippingInfo

## Table of contents

### Functions

- [useUpdateSubscriptionShippingInfo](useUpdateSubscriptionShippingInfo.md#useupdatesubscriptionshippinginfo)

## Functions

### useUpdateSubscriptionShippingInfo

▸ **useUpdateSubscriptionShippingInfo**(): `Object`

[Mutation hook] useUpdateSubscriptionShippingInfo uses the graphQL mutation

<b>updateSubscriptionFulfillmentInfo(subscriptionId: String!, fulfillmentInfoInput: SbFulfillmentInfoInput ): SBFulfillmentInfo</b>

Description : Updates Subscription Fulfillment Info

Parameters passed to function updateSubscriptionFulfillmentInfo(props: UpdateSubscriptionShippingInfoProps) => expects object of type 'UpdateSubscriptionFulfillmentInfoProps' containing subscriptionId and fulfillmentInfoInput

On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.

#### Returns

`Object`

'response.updateSubscriptionFulfillmentInfo', which returns updated Subscription FulfillmentInfo

| Name                             | Type                                                                                     |
| :------------------------------- | :--------------------------------------------------------------------------------------- |
| `updateSubscriptionShippingInfo` | `UseMutationResult`<`any`, `unknown`, `UpdateSubscriptionShippingInfoProps`, `unknown`\> |

#### Defined in

[mutations/subscription/useUpdateSubscriptionShippingInfo/useUpdateSubscriptionShippingInfo.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useUpdateSubscriptionShippingInfo/useUpdateSubscriptionShippingInfo.ts#L44)
