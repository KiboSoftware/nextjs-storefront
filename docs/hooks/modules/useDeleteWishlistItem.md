[next-storefront](../README.md) / useDeleteWishlistItem

# Module: useDeleteWishlistItem

## Table of contents

### Functions

- [useDeleteWishlistItem](useDeleteWishlistItem.md#usedeletewishlistitem)

## Functions

### useDeleteWishlistItem

▸ **useDeleteWishlistItem**(`params?`): `Object`

[Mutation hook] useDeleteWishlistItem uses the graphql mutation
<b>deleteWishlistItem(wishlistId: String!, wishlistItemId: String!): Boolean</b>

Description : Deletes item from wishlist based on wishlistId and wishlistItemId.

Parameters passed to function deleteWishlistItem(props: DeleteWishlistItemInput) => expects params as product and currentWishlist.

On success, calls invalidateQueries on wishlistKeys, clears timeout and fetches the updated result

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | `WishlistHookParams` | Accepts a WishlistHookParams value |

#### Returns

`Object`

response?.deleteWishlistItem, which contains True/False value to identify if wishlist item has been deleted or not.

| Name | Type |
| :------ | :------ |
| `deleteWishlistItem` | `UseMutationResult`<`any`, `unknown`, `DeleteWishlistItemInput`, `unknown`\> |

#### Defined in

[mutations/wishlist/useDeleteWishlistItem/useDeleteWishlistItem.ts:39](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/wishlist/useDeleteWishlistItem/useDeleteWishlistItem.ts#L39)
