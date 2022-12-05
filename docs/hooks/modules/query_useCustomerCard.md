[next-storefront](../README.md) / [Exports](../modules.md) / query_useCustomerCard

# Module: query_useCustomerCard

## Table of contents

### Functions

- [useCustomerCardsQueries](query_useCustomerCard.md#usecustomercardsqueries)

## Functions

### useCustomerCardsQueries

▸ **useCustomerCardsQueries**(`accountId`): `UseCustomerCardsResponse`

[Query hook] useCustomerCardsQueries uses the graphQL query

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

[queries/useCustomerCardsQueries/useCustomerCardsQueries.ts:48](https://github.com/KiboSoftware/nextjs-storefront/blob/a6cbcc7/hooks/queries/useCustomerCardsQueries/useCustomerCardsQueries.ts#L48)
