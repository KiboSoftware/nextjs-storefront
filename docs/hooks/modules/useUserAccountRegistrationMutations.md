[next-storefront](../README.md) / useUserAccountRegistrationMutations

# Module: useUserAccountRegistrationMutations

## Table of contents

### Functions

- [useUserAccountRegistrationMutations](useUserAccountRegistrationMutations.md#useuseraccountregistrationmutations)

## Functions

### useUserAccountRegistrationMutations

▸ **useUserAccountRegistrationMutations**(): `Object`

[Mutation hook] useUserAccountRegistrationMutations uses the graphQL mutation

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

[mutations/useUserMutations/useUserAccountRegistrationMutations.ts:35](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useUserMutations/useUserAccountRegistrationMutations.ts#L35)
