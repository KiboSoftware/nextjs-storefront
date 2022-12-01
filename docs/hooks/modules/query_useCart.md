[next-storefront](../README.md) / [Exports](../modules.md) / query_useCart

# Module: query_useCart

## Table of contents

### Functions

- [useCartQueries](query_useCart.md#usecartqueries)

## Functions

### useCartQueries

▸ **useCartQueries**(`initialData`): `UseCartType`

[Query hook] useCartQueries uses the graphQL query

<b>currentCart: Cart</b>

Description : Fetches details about the items present currently in the cart

Parameters passed to function getCurrentCart()

On success, returns the current cart items with 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name          | Type   | Description                                                                                                                  |
| :------------ | :----- | :--------------------------------------------------------------------------------------------------------------------------- |
| `initialData` | `Cart` | stores the data for cart present on server side. Used to check if the data has got stale, if not; data is not fetched again. |

#### Returns

`UseCartType`

'response?.currentCart' which contains all the updated items present in cart

#### Defined in

[queries/useCartQueries/useCartQueries.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/queries/useCartQueries/useCartQueries.ts#L45)
