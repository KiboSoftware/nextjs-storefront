[next-storefront](../README.md) / useCreateWishlist

# Module: useCreateWishlist

## Table of contents

### Functions

- [useCreateWishlist](useCreateWishlist.md#usecreatewishlist)

## Functions

### useCreateWishlist

▸ **useCreateWishlist**(): `Object`

[Mutation hook] useCreateWishlist uses the graphQL mutation

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

[mutations/wishlist/useCreateWishlist/useCreateWishlist.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/wishlist/useCreateWishlist/useCreateWishlist.ts#L44)
