[next-storefront](../README.md) / useGetCards

# Module: useGetCards

## Table of contents

### Functions

- [useGetCards](useGetCards.md#usecustomercardsqueries)

## Functions

### useGetCards

▸ **useGetCards**(`accountId`): `UseCustomerCardsResponse`

[Query hook] useGetCards uses the graphQL query

<b>customerAccountCards(accountId: Int!): CardCollection</b>

Description : Fetches saved payment cards for a particular user

Parameters passed to function loadCustomerAccountCards(accountId: number) => expects accountId

On success, returns the card collection of customer's account

#### Parameters

| Name        | Type     | Description                                                                  |
| :---------- | :------- | :--------------------------------------------------------------------------- |
| `accountId` | `number` | stores the user id of the user whose saved card details needed to be fetched |

#### Returns

`UseCustomerCardsResponse`

'response?.customerAccountCards' which contains all the saved cards for payment options for the requested user based on accountId

#### Defined in

[queries/useGetCards/useGetCards.ts:48](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useGetCards/useGetCards.ts#L48)
