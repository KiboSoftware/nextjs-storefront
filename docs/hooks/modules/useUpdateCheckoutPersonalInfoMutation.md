[next-storefront](../README.md) / useUpdateCheckoutPersonalInfoMutation

# Module: useUpdateCheckoutPersonalInfoMutation

## Table of contents

### Functions

- [useUpdateCheckoutPersonalInfoMutation](useUpdateCheckoutPersonalInfoMutation.md#useupdatecheckoutpersonalinfomutation)

## Functions

### useUpdateCheckoutPersonalInfoMutation

▸ **useUpdateCheckoutPersonalInfoMutation**(): `UseMutationResult`<`any`, `unknown`, `PersonalInfo`, `unknown`\>

[Mutation hook] useUpdateCheckoutPersonalInfoMutation uses the graphQL mutation

<b>updateOrder(orderId: String!,updateMode: String, version: String, orderInput: OrderInput): Order</b>

Description : Updates user personal info at checkout

Parameters passed to function updatePersonalInfo(personalInfo: PersonalInfo) => expects object of type ' PersonalInfo' containing orderId,updateMode , version ,orderInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `PersonalInfo`, `unknown`\>

'response?.updateOrderBillingInfo', which contains updated checkout information

#### Defined in

[mutations/useUpdateCheckoutMutations/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfoMutation.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useUpdateCheckoutMutations/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfoMutation.ts#L47)
