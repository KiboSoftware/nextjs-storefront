[next-storefront](../README.md) / useAddToWishlistItem

# Module: useAddToWishlistItem

## Table of contents

### Functions

- [useAddToWishlistItem](useAddToWishlistItem.md#useaddtowishlistitem)

## Functions

### useAddToWishlistItem

▸ **useAddToWishlistItem**(): `Object`

[Mutation hook] useAddToWishlistItem uses the graphQL mutation

<b>createWishlistItem(wishlistId: String!, wishlistItemInput: WishlistItemInput): WishlistItem</b>

Description : Add item to wishlist for current user

Parameters passed to function addToWishlist(props: WishlistItemInputParams) => expects object of type ' WishlistItemInputParams' containing product ,customerAccountId ,currentWishlist

On success, calls invalidateQueries on wishlistKeys and fetches the updated result.

#### Returns

`Object`

'response?.createWishlistItem', which contains wishlist items for current user

| Name            | Type                                                                         |
| :-------------- | :--------------------------------------------------------------------------- |
| `addToWishlist` | `UseMutationResult`<`any`, `unknown`, `WishlistItemInputParams`, `unknown`\> |

#### Defined in

[mutations/wishlist/useAddToWishlistItem/useAddToWishlistItem.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/wishlist/useAddToWishlistItem/useAddToWishlistItem.ts#L46)
