[next-storefront](../README.md) / useUpdateUserDataMutations

# Module: useUpdateUserDataMutations

## Table of contents

### Functions

- [useUpdateUserDataMutations](useUpdateUserDataMutations.md#useupdateuserdatamutations)

## Functions

### useUpdateUserDataMutations

▸ **useUpdateUserDataMutations**(): `Object`

[Mutation hook] useUpdateUserDataMutations uses the graphQL mutation

<b>updateCustomerAccount(accountId: Int!, customerAccountInput: CustomerAccountInput): CustomerAccount</b>

Description : Update the existing customer's profile information like first name, last name and email address.

Parameters passed to internal function updateUserDetails(props: UpdateUserDataProps) => expects object containing accountId and customerAccountInput to update the profile details.

On success, calls invalidateQueries loginKeys.user and fetches the updated result.

#### Returns

`Object`

'response', which has updated customer's profile details like userName, firstName, lastName, emailAddress etc.

| Name             | Type                                                                     |
| :--------------- | :----------------------------------------------------------------------- |
| `updateUserData` | `UseMutationResult`<`any`, `unknown`, `UpdateUserDataProps`, `unknown`\> |

#### Defined in

[mutations/useProfile/useUpdateUserData/useUpdateUserData.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useProfile/useUpdateUserData/useUpdateUserData.ts#L45)
