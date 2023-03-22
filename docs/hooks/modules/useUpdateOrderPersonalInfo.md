[next-storefront](../README.md) / useUpdateOrderPersonalInfo

# Module: useUpdateOrderPersonalInfo

## Table of contents

### Functions

- [useUpdateOrderPersonalInfo](useUpdateOrderPersonalInfo.md#useupdateorderpersonalinfo)

## Functions

### useUpdateOrderPersonalInfo

▸ **useUpdateOrderPersonalInfo**(): `UseMutationResult`<`any`, `unknown`, `PersonalInfo`, `unknown`\>

[Mutation hook] useUpdateOrderPersonalInfo uses the graphQL mutation

<b>updateOrder(orderId: String!,updateMode: String, version: String, orderInput: OrderInput): Order</b>

Description : Updates user personal info at checkout

Parameters passed to function updatePersonalInfo({ checkout, email }: PersonalInfo) => expects object of type ' PersonalInfo' containing  checkout and email

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `PersonalInfo`, `unknown`\>

'response?.checkout', which contains updated checkout information

#### Defined in

[mutations/standardCheckout/useUpdateOrderPersonalInfo/useUpdateOrderPersonalInfo.ts:54](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useUpdateOrderPersonalInfo/useUpdateOrderPersonalInfo.ts#L54)
