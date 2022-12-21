[next-storefront](../README.md) / useDeleteCustomerAddressMutation

# Module: useDeleteCustomerAddressMutation

## Table of contents

### Functions

- [useDeleteCustomerAddressMutation](useDeleteCustomerAddressMutation.md#usedeletecustomeraddressmutation)

## Functions

### useDeleteCustomerAddressMutation

▸ **useDeleteCustomerAddressMutation**(): `Object`

[Mutation hook] useDeleteCustomerAddressMutation uses the graphQL mutation

<b>deleteCustomerAccountContact(accountId: Int!, contactId: Int!): Boolean</b>

Description : Delete the customer's contact (address) saved on their account

Parameters passed to function deleteCustomerAccountContactDetails(params: DeleteCustomerAccountContactDetailsParams) => expects object of type DeleteCustomerAccountContactDetailsParams containing accountId and contactId.

On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.

#### Returns

`Object`

'response?.deleteCustomerAccountContact', which contains True/False value to identify if customer's contact has been deleted or not.

| Name                        | Type                                                                                           |
| :-------------------------- | :--------------------------------------------------------------------------------------------- |
| `deleteSavedAddressDetails` | `UseMutationResult`<`any`, `unknown`, `DeleteCustomerAccountContactDetailsParams`, `unknown`\> |

#### Defined in

[mutations/useCustomerAddressMutations/useDeleteCustomerAddressMutation.ts:42](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCustomerAddressMutations/useDeleteCustomerAddressMutation.ts#L42)
