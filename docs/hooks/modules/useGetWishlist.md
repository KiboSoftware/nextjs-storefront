[next-storefront](../README.md) / useGetWishlist

# Module: useGetWishlist

## Table of contents

### Functions

- [useGetWishlist](useGetWishlist.md#usegetwishlist)

## Functions

### useGetWishlist

▸ **useGetWishlist**(): `UseWishlistResponse`

[Query hook] useGetWishlist uses the graphQL query

<b>wishlists(startIndex: Int, pageSize: Int, sortBy: String, filter: String): WishlistCollection</b>

Description : Fetches the all wishlists for logged in user. To authenticate the user, request header taking token from the cookie.

Parameters passed to function getWishlists()

On success, returns the first item of wishlists as it will always have single item with respect to customer account id.

#### Returns

`UseWishlistResponse`

'response?.wishlists?.items[0], which contains the first wishlist item'

#### Defined in

[queries/wishlist/useGetWishlist/useGetWishlist.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/wishlist/useGetWishlist/useGetWishlist.ts#L46)
