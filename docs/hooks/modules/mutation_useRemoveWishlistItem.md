[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useRemoveWishlistItem

# Module: mutation_useRemoveWishlistItem

## Table of contents

### Functions

- [useRemoveWishlistItemMutation](mutation_useRemoveWishlistItem.md#useremovewishlistitemmutation)

## Functions

### useRemoveWishlistItemMutation

▸ **useRemoveWishlistItemMutation**(`params?`): `Object`

[Mutation hook] useRemoveCartItemMutation uses the graphql mutation
<b>deleteWishlistItem(wishlistId: String!, wishlistItemId: String!): Boolean</b>

Description : Deletes item from wishlist based on wishlistId and wishlistItemId.

Parameters passed to function removeWishlistItem(props: RemoveWishlistItemInput) => expects params as product and currentWishlist.

On success, calls invalidateQueries on wishlistKeys, clears timeout and fetches the updated result

#### Parameters

| Name      | Type                 | Description                        |
| :-------- | :------------------- | :--------------------------------- |
| `params?` | `WishlistHookParams` | Accepts a WishlistHookParams value |

#### Returns

`Object`

response?.deleteWishlistItem, which contains True/False value to identify if wishlist item has been deleted or not.

| Name                 | Type                                                                         |
| :------------------- | :--------------------------------------------------------------------------- |
| `removeWishlistItem` | `UseMutationResult`<`any`, `unknown`, `RemoveWishlistItemInput`, `unknown`\> |

#### Defined in

[mutations/useWishlistMutations/useRemoveWishlistItemMutation/useRemoveWishlistItemMutation.ts:39](https://github.com/KiboSoftware/nextjs-storefront/blob/98414f4/hooks/mutations/useWishlistMutations/useRemoveWishlistItemMutation/useRemoveWishlistItemMutation.ts#L39)
