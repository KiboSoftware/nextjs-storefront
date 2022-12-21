[next-storefront](../README.md) / useUpdateCheckoutBillingInfoMutation

# Module: useUpdateCheckoutBillingInfoMutation

## Table of contents

### Functions

- [useUpdateCheckoutBillingInfoMutation](useUpdateCheckoutBillingInfoMutation.md#useupdatecheckoutbillinginfomutation)

## Functions

### useUpdateCheckoutBillingInfoMutation

▸ **useUpdateCheckoutBillingInfoMutation**(): `UseMutationResult`<`any`, `unknown`, `UpdateBillingInfoInput`, `unknown`\>

[Mutation hook] useUpdateCheckoutBillingInfoMutation uses the graphQL mutation

<b>updateOrderBillingInfo(orderId: String!, updateMode: String, version: String, billingInfoInput: BillingInfoInput): BillingInfo</b>

Description : Updates user billing info at checkout

Parameters passed to function updateBillingInfo(params: UpdateBillingInfoInput) => expects object of type 'UpdateBillingInfoInput' containing orderId and billingInfo input

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateBillingInfoInput`, `unknown`\>

'response?.updateOrderBillingInfo', which contains updated billing details of user

#### Defined in

[mutations/useUpdateCheckoutMutations/useUpdateCheckoutBillingInfo/useUpdateCheckoutBillingInfoMutation.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useUpdateCheckoutMutations/useUpdateCheckoutBillingInfo/useUpdateCheckoutBillingInfoMutation.ts#L45)
