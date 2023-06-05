[next-storefront](../README.md) / useGetCart

# Module: useGetCart

## Table of contents

### Functions

- [useGetCart](useGetCart.md#usegetcart)

## Functions

### useGetCart

▸ **useGetCart**(`initialData`): `UseCartType`

[Query hook] useGetCart uses the graphQL query

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

[queries/cart/useGetCart/useGetCart.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/cart/useGetCart/useGetCart.ts#L45)
