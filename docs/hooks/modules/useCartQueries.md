[next-storefront](../README.md) / useCartQueries

# Module: useCartQueries

## Table of contents

### Functions

- [useCartQueries](useCartQueries.md#usecartqueries)

## Functions

### useCartQueries

▸ **useCartQueries**(`initialData`): `UseCartType`

[Query hook] useCartQueries uses the graphQL query

<b>currentCart: Cart</b>

Description : Fetches details about the items present currently in the cart

Parameters passed to function getCurrentCart()

On success, returns the current cart items with 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name          | Type     | Description                                                                                                                  |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `initialData` | `CrCart` | stores the data for cart present on server side. Used to check if the data has got stale, if not; data is not fetched again. |

#### Returns

`UseCartType`

'response?.currentCart' which contains all the updated items present in cart

#### Defined in

[queries/useCartQueries/useCartQueries.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useCartQueries/useCartQueries.ts#L45)
