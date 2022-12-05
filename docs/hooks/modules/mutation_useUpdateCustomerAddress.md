[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateCustomerAddress

# Module: mutation_useUpdateCustomerAddress

## Table of contents

### Functions

- [useUpdateCustomerAddressMutation](mutation_useUpdateCustomerAddress.md#useupdatecustomeraddressmutation)

## Functions

### useUpdateCustomerAddressMutation

▸ **useUpdateCustomerAddressMutation**(): `Object`

[Mutation hook] useUpdateCustomerAddressMutation uses the graphQL mutation

<b>updateCustomerAccountContact(accountId: Int!, contactId: Int!, userId: String, customerContactInput: CustomerContactInput): CustomerContact</b>

Description : Update the existing customer's contact (address) saved into the account.

Parameters passed to function updateCustomerAccountContactDetails(params: UpdateCustomerAccountContactDetailsParams) => expects object of type UpdateCustomerAccountContactDetailsParams containing accountId, contactId and customerContactInput.

On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.

#### Returns

`Object`

'response?.updateCustomerAccountContact', which contains list of Customer's contact details.

| Name                        | Type                                                                                           |
| :-------------------------- | :--------------------------------------------------------------------------------------------- |
| `updateSavedAddressDetails` | `UseMutationResult`<`any`, `unknown`, `UpdateCustomerAccountContactDetailsParams`, `unknown`\> |

#### Defined in

[mutations/useCustomerAddressMutations/useUpdateCustomerAddressMutation.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/a6cbcc7/hooks/mutations/useCustomerAddressMutations/useUpdateCustomerAddressMutation.ts#L47)
