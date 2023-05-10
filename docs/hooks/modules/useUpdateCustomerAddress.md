[next-storefront](../README.md) / useUpdateCustomerAddress

# Module: useUpdateCustomerAddress

## Table of contents

### Functions

- [useUpdateCustomerAddress](useUpdateCustomerAddress.md#useupdatecustomeraddress)

## Functions

### useUpdateCustomerAddress

▸ **useUpdateCustomerAddress**(): `Object`

[Mutation hook] useUpdateCustomerAddress uses the graphQL mutation

<b>updateCustomerAccountContact(accountId: Int!, contactId: Int!, userId: String, customerContactInput: CustomerContactInput): CustomerContact</b>

Description : Update the existing customer's contact (address) saved into the account.

Parameters passed to function updateCustomerAccountContactDetails(params: UpdateCustomerAccountContactDetailsParams) => expects object of type UpdateCustomerAccountContactDetailsParams containing accountId, contactId and customerContactInput.

On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.

#### Returns

`Object`

'response?.updateCustomerAccountContact', which contains list of Customer's contact details.

| Name                    | Type                                                                                           |
| :---------------------- | :--------------------------------------------------------------------------------------------- |
| `updateCustomerAddress` | `UseMutationResult`<`any`, `unknown`, `UpdateCustomerAccountContactDetailsParams`, `unknown`\> |

#### Defined in

[mutations/address/update/useUpdateCustomerAddress.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/address/update/useUpdateCustomerAddress.ts#L47)
