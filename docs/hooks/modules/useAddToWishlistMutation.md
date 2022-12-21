[next-storefront](../README.md) / useAddToWishlistMutation

# Module: useAddToWishlistMutation

## Table of contents

### Functions

- [useAddToWishlistMutation](useAddToWishlistMutation.md#useaddtowishlistmutation)

## Functions

### useAddToWishlistMutation

▸ **useAddToWishlistMutation**(): `Object`

[Mutation hook] useAddToWishlistMutation uses the graphQL mutation

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

[mutations/useWishlistMutations/useAddToWishlistMutation/useAddToWishlistMutation.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useWishlistMutations/useAddToWishlistMutation/useAddToWishlistMutation.ts#L46)
