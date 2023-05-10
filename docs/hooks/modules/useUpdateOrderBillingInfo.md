[next-storefront](../README.md) / useUpdateOrderBillingInfo

# Module: useUpdateOrderBillingInfo

## Table of contents

### Functions

- [useUpdateOrderBillingInfo](useUpdateOrderBillingInfo.md#useupdateorderbillinginfo)

## Functions

### useUpdateOrderBillingInfo

▸ **useUpdateOrderBillingInfo**(): `UseMutationResult`<`any`, `unknown`, `UpdateBillingInfoInput`, `unknown`\>

[Mutation hook] useUpdateOrderBillingInfo uses the graphQL mutation

<b>updateOrderBillingInfo(orderId: String!, updateMode: String, version: String, billingInfoInput: BillingInfoInput): BillingInfo</b>

Description : Updates user billing info at checkout

Parameters passed to function updateBillingInfo(params: UpdateBillingInfoInput) => expects object of type 'UpdateBillingInfoInput' containing orderId and billingInfo input

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateBillingInfoInput`, `unknown`\>

'response?.updateOrderBillingInfo', which contains updated billing details of user

#### Defined in

[mutations/standardCheckout/useUpdateOrderBillingInfo/useUpdateOrderBillingInfo.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useUpdateOrderBillingInfo/useUpdateOrderBillingInfo.ts#L45)
