[next-storefront](../README.md) / useUpdateCustomerProfile

# Module: useUpdateCustomerProfile

## Table of contents

### Functions

- [useUpdateCustomerProfile](useUpdateCustomerProfile.md#useupdatecustomerprofile)

## Functions

### useUpdateCustomerProfile

▸ **useUpdateCustomerProfile**(): `Object`

[Mutation hook] useUpdateCustomerProfile uses the graphQL mutation

<b>updateCustomerAccount(accountId: Int!, customerAccountInput: CustomerAccountInput): CustomerAccount</b>

Description : Update the existing customer's profile information like first name, last name and email address.

Parameters passed to internal function updateCustomerProfile(props: UpdateCustomerProfileProps) => expects object containing accountId and customerAccountInput to update the profile details.

On success, calls invalidateQueries loginKeys.user and fetches the updated result.

#### Returns

`Object`

'response', which has updated customer's profile details like userName, firstName, lastName, emailAddress etc.

| Name             | Type                                                                            |
| :--------------- | :------------------------------------------------------------------------------ |
| `updateUserData` | `UseMutationResult`<`any`, `unknown`, `UpdateCustomerProfileProps`, `unknown`\> |

#### Defined in

[mutations/myAccount/useUpdateCustomerProfile/useUpdateCustomerProfile.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/myAccount/useUpdateCustomerProfile/useUpdateCustomerProfile.ts#L45)
