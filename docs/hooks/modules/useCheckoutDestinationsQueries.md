[next-storefront](../README.md) / useCheckoutDestinationsQueries

# Module: useCheckoutDestinationsQueries

## Table of contents

### Functions

- [useCheckoutDestinationsQueries](useCheckoutDestinationsQueries.md#usecheckoutdestinationsqueries)

## Functions

### useCheckoutDestinationsQueries

▸ **useCheckoutDestinationsQueries**(`params`): `UseDestinationsResponse`

[Query hook] useCheckoutDestinationsQueries uses the graphQL query

<b>checkoutDestinations(checkoutId: String!): [CrDestination]</b>

Description : Gets all the destinations specified by the checkout Id.

Parameters passed to function getCheckoutDestinations(params: UseDestinations) => expects checkoutId

#### Parameters

| Name     | Type              | Description       |
| :------- | :---------------- | :---------------- |
| `params` | `UseDestinations` | stores checkoutId |

#### Returns

`UseDestinationsResponse`

'response?.checkoutDestinations' which contains all the destinations of the specified checkout Id

#### Defined in

[queries/multiShip/useCheckoutDestinationsQueries/useCheckoutDestinationsQueries.tsx:48](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/multiShip/useCheckoutDestinationsQueries/useCheckoutDestinationsQueries.tsx#L48)
