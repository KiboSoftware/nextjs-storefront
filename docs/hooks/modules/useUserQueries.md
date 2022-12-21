[next-storefront](../README.md) / useUserQueries

# Module: useUserQueries

## Table of contents

### Functions

- [useUserQueries](useUserQueries.md#useuserqueries)

## Functions

### useUserQueries

▸ **useUserQueries**(): `UserResultType`

[Query hook] useUserQueries uses the graphQL query

<b>getCurrentAccount: CustomerAccount</b>

Description : Fetches the current customer's account details. This hook always fetch the account details whether user is logged in or not.
For logged in user, "id" will always have value in the response but for anonymous users, will not receive the id.
The purpose of this hook is, to authenticate the logged in user before calling any API, if cookie value got expired/removed in-between.

Parameters passed to function loadUser()

On success, returns the customer account

#### Returns

`UserResultType`

'response?.customerAccount, which contains customer's account details'

#### Defined in

[queries/useUserQueries/useUserQueries.ts:49](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useUserQueries/useUserQueries.ts#L49)
