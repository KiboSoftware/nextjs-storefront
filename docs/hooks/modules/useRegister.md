[next-storefront](../README.md) / useRegister

# Module: useRegister

## Table of contents

### Functions

- [useRegister](useRegister.md#useregister)

## Functions

### useRegister

▸ **useRegister**(): `Object`

[Mutation hook] useRegister uses the graphQL mutation

<b>createCustomerAccountAndLogin(customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput): CustomerAuthTicket</b>

Description : Creates account for user and logIn user into account created

Parameters passed to function registerUser(customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput) => expects object of type ' CustomerAccountAndAuthInfoInput' containing account, externalPassword, isImport and password.

On success, calls invalidateQueries on loginKeys and fetches the updated result.

#### Returns

`Object`

'response?.account', which contains auth related information for user

| Name          | Type                                                                                   |
| :------------ | :------------------------------------------------------------------------------------- |
| `data`        | `any`                                                                                  |
| `error`       | `unknown`                                                                              |
| `isError`     | `boolean`                                                                              |
| `isLoading`   | `boolean`                                                                              |
| `isSuccess`   | `boolean`                                                                              |
| `mutate`      | `UseMutateFunction`<`any`, `unknown`, `CustomerAccountAndAuthInfoInput`, `void`\>      |
| `mutateAsync` | `UseMutateAsyncFunction`<`any`, `unknown`, `CustomerAccountAndAuthInfoInput`, `void`\> |

#### Defined in

[mutations/auth/register/useRegister.ts:36](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/auth/register/useRegister.ts#L36)
