[next-storefront](../README.md) / useGetCustomerAddresses

# Module: useGetCustomerAddresses

## Table of contents

### Functions

- [useGetCustomerAddresses](useGetCustomerAddresses.md#usegetcustomeraddresses)

## Functions

### useGetCustomerAddresses

▸ **useGetCustomerAddresses**(`accountId`): `UseCustomerContactsResponse`

[Query hook] useGetCustomerAddresses uses the graphQL query

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

[queries/address/useGetCustomerAddresses/useGetCustomerAddresses.ts:48](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/address/useGetCustomerAddresses/useGetCustomerAddresses.ts#L48)
