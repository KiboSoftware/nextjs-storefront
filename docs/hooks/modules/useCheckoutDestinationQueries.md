[next-storefront](../README.md) / useCheckoutDestinationQueries

# Module: useCheckoutDestinationQueries

## Table of contents

### Functions

- [useCheckoutDestinationQueries](useCheckoutDestinationQueries.md#usecheckoutdestinationqueries)

## Functions

### useCheckoutDestinationQueries

▸ **useCheckoutDestinationQueries**(`params`): `UseDestinationResponse`

[Query hook] useCheckoutDestinationQueries uses the graphQL query

<b>checkoutDestination(checkoutId: String!, destinationId: String!): CrDestination</b>

Description : Gets a destination specified by the checkout Id and destination Id.

Parameters passed to function getCheckoutDestination(params: UseDestination) => expects checkoutId and destinationId

#### Parameters

| Name     | Type             | Description                         |
| :------- | :--------------- | :---------------------------------- |
| `params` | `UseDestination` | stores checkoutId and destinationId |

#### Returns

`UseDestinationResponse`

'response?.checkoutDestination' which contains destination of the specified destinationId

#### Defined in

[queries/multiShip/useCheckoutDestinationQueries/useCheckoutDestinationQueries.tsx:49](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/multiShip/useCheckoutDestinationQueries/useCheckoutDestinationQueries.tsx#L49)
