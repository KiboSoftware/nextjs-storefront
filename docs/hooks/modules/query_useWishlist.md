[next-storefront](../README.md) / [Exports](../modules.md) / query_useWishlist

# Module: query_useWishlist

## Table of contents

### Functions

- [useWishlistQueries](query_useWishlist.md#usewishlistqueries)

## Functions

### useWishlistQueries

▸ **useWishlistQueries**(): `UseWishlistResponse`

[Query hook] useWishlistQueries uses the graphQL query

<b>wishlists(startIndex: Int, pageSize: Int, sortBy: String, filter: String): WishlistCollection</b>

Description : Fetches the all wishlists

Parameters passed to function getWishlists()

On success, returns the first item of wishlists

#### Returns

`UseWishlistResponse`

'response?.wishlists?.items[0], which contains the first wishlist item'

#### Defined in

[queries/useWishlistQueries/useWishlistQueries.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/queries/useWishlistQueries/useWishlistQueries.ts#L46)
