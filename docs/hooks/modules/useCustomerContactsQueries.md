[next-storefront](../README.md) / useCustomerContactsQueries

# Module: useCustomerContactsQueries

## Table of contents

### Functions

- [useCustomerContactsQueries](useCustomerContactsQueries.md#usecustomercontactsqueries)

## Functions

### useCustomerContactsQueries

▸ **useCustomerContactsQueries**(`accountId`): `UseCustomerContactsResponse`

[Query hook] useCustomerContactsQueries uses the graphQL query

<b>customerAccountContacts(accountId: Int!,startIndex: Int,pageSize: Int): CustomerContactCollection</b>

Description : Fetches saved addresses for a particular user

Parameters passed to function loadCustomerAccountContacts(accountId: number) => expects accountId.

On success, returns the saved addresses with 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name        | Type     | Description                                                                     |
| :---------- | :------- | :------------------------------------------------------------------------------ |
| `accountId` | `number` | stores the user id of the user whose saved address details needed to be fetched |

#### Returns

`UseCustomerContactsResponse`

'response?.customerAccountContacts' which contains all the saved addresses details for the requested user based on accountId

#### Defined in

[queries/useCustomerContactsQueries/useCustomerContactsQueries.ts:48](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useCustomerContactsQueries/useCustomerContactsQueries.ts#L48)
