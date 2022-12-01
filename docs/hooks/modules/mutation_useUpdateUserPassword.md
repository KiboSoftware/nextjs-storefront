[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateUserPassword

# Module: mutation_useUpdateUserPassword

## Table of contents

### Functions

- [useUpdateUserPasswordMutations](mutation_useUpdateUserPassword.md#useupdateuserpasswordmutations)

## Functions

### useUpdateUserPasswordMutations

▸ **useUpdateUserPasswordMutations**(): `Object`

[Mutation hook] useUpdateUserPasswordMutations uses the graphQL mutation

<b>changeCustomerAccountPassword(accountId: Int!, unlockAccount: Boolean, userId: String, passwordInfoInput: PasswordInfoInput): Boolean</b>

Description : Update the existing customer's account password by passing old password and new password.

Parameters passed to internal function updateUserPassword(props: UpdateUserPasswordProps) => expects object containing accountId and passwordInfoInput to update the password.

#### Returns

`Object`

'response', that is True/False value to identify if password has been changed or not.

| Name                     | Type                                                                         |
| :----------------------- | :--------------------------------------------------------------------------- |
| `updateUserPasswordData` | `UseMutationResult`<`any`, `unknown`, `UpdateUserPasswordProps`, `unknown`\> |

#### Defined in

[mutations/useProfile/useUpdateUserPassword/useUpdateUserPassword.ts:41](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/mutations/useProfile/useUpdateUserPassword/useUpdateUserPassword.ts#L41)
