[next-storefront](../README.md) / useCreateCustomerAddress

# Module: useCreateCustomerAddress

## Table of contents

### Functions

- [useCreateCustomerAddress](useCreateCustomerAddress.md#usecreatecustomeraddress)

## Functions

### useCreateCustomerAddress

▸ **useCreateCustomerAddress**(): `Object`

[Mutation hook] useCreateCustomerAddress uses the graphQL mutation

<b>createCustomerAccountContact(accountId: Int!, customerContactInput: CustomerContactInput): CustomerContact</b>

Description : Save the customer's contact (address) to the account which can be used at the time of checkout for shipping and billing address.

Parameters passed to function addCustomerAccountContactDetails(params: CreateCustomerAccountContactDetailsParams) => expects object of type CreateCustomerAccountContactDetailsParams containing accountId and customerContactInput.

On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.

#### Returns

`Object`

'response?.createCustomerAccountContact', which contains Customer's contact details like accountId,  Address, firstName, LastName etc.

| Name | Type |
| :------ | :------ |
| `addSavedAddressDetails` | `UseMutationResult`<`any`, `unknown`, `CreateCustomerAccountContactDetailsParams`, `unknown`\> |

#### Defined in

[mutations/address/create/useCreateCustomerAddress.ts:43](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/address/create/useCreateCustomerAddress.ts#L43)
