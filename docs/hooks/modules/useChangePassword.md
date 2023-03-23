[next-storefront](../README.md) / useChangePassword

# Module: useChangePassword

## Table of contents

### Functions

- [useChangePassword](useChangePassword.md#usechangepassword)

## Functions

### useChangePassword

▸ **useChangePassword**(): `Object`

[Mutation hook] useChangePassword uses the graphQL mutation

<b>changeCustomerAccountPassword(accountId: Int!, unlockAccount: Boolean, userId: String, passwordInfoInput: PasswordInfoInput): Boolean</b>

Description : Update the existing customer's account password by passing old password and new password.

Parameters passed to internal function updateUserPassword(props: ChangePasswordProps) => expects object containing accountId and passwordInfoInput to update the password.

#### Returns

`Object`

'response', that is True/False value to identify if password has been changed or not.

| Name             | Type                                                                     |
| :--------------- | :----------------------------------------------------------------------- |
| `changePassword` | `UseMutationResult`<`any`, `unknown`, `ChangePasswordProps`, `unknown`\> |

#### Defined in

[mutations/myAccount/useChangePassword/useChangePassword.ts:41](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/myAccount/useChangePassword/useChangePassword.ts#L41)
