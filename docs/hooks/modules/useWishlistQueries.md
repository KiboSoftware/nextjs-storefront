[next-storefront](../README.md) / useWishlistQueries

# Module: useWishlistQueries

## Table of contents

### Functions

- [useWishlistQueries](useWishlistQueries.md#usewishlistqueries)

## Functions

### useWishlistQueries

▸ **useWishlistQueries**(): `UseWishlistResponse`

[Query hook] useWishlistQueries uses the graphQL query

<b>wishlists(startIndex: Int, pageSize: Int, sortBy: String, filter: String): WishlistCollection</b>

Description : Fetches the all wishlists for logged in user. To authenticate the user, request header taking token from the cookie.

Parameters passed to function getWishlists()

On success, returns the first item of wishlists as it will always have single item with respect to customer account id.

#### Returns

`UseWishlistResponse`

'response?.wishlists?.items[0], which contains the first wishlist item'

#### Defined in

[queries/useWishlistQueries/useWishlistQueries.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useWishlistQueries/useWishlistQueries.ts#L46)
