[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useCreateWishlist

# Module: mutation_useCreateWishlist

## Table of contents

### Functions

- [useCreateWishlistMutation](mutation_useCreateWishlist.md#usecreatewishlistmutation)

## Functions

### useCreateWishlistMutation

▸ **useCreateWishlistMutation**(): `Object`

[Mutation hook] useCreateWishlistMutation uses the graphQL mutation

<b>createWishlist(wishlistInput: WishlistInput): Wishlist</b>

Description : Creates the wishlist for logged in user

Parameters passed to function createWishlist(customerAccountId: number) => expects object containing accountId to create wishlist.

On success, calls invalidateQueries on wishlistKeys and fetches the updated result.

#### Returns

`Object`

'response?.createWishlistItem', which contains wishlist created for user.

| Name             | Type                                                        |
| :--------------- | :---------------------------------------------------------- |
| `createWishlist` | `UseMutationResult`<`any`, `unknown`, `number`, `unknown`\> |

#### Defined in

[mutations/useWishlistMutations/useCreateWishlistMutation/useCreateWishlistMutation.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/mutations/useWishlistMutations/useCreateWishlistMutation/useCreateWishlistMutation.ts#L44)
