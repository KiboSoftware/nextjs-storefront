[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateCheckoutPersonalInfo

# Module: mutation_useUpdateCheckoutPersonalInfo

## Table of contents

### Functions

- [useUpdateCheckoutPersonalInfoMutation](mutation_useUpdateCheckoutPersonalInfo.md#useupdatecheckoutpersonalinfomutation)

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

[mutations/useUpdateCheckoutMutations/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfoMutation.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/mutations/useUpdateCheckoutMutations/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfoMutation.ts#L47)
