[next-storefront](../README.md) / useRemoveCartItemMutation

# Module: useRemoveCartItemMutation

## Table of contents

### Functions

- [useRemoveCartItemMutation](useRemoveCartItemMutation.md#useremovecartitemmutation)

## Functions

### useRemoveCartItemMutation

▸ **useRemoveCartItemMutation**(): `Object`

[Mutation hook] useRemoveCartItemMutation uses the graphQL mutation

<b>deleteCurrentCartItem(cartItemId: String!): Boolean</b>

Description : Removes the product item from the cart

Parameters passed to function removeCartItem(params: RemoveCartItemParams) => expects object of type RemoveCartItemParams containing cartItemId of the product to be deleted

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`Object`

'response?.deleteCartItemMutation' returns 'true' if product is deleted

| Name             | Type                                                                  |
| :--------------- | :-------------------------------------------------------------------- |
| `removeCartItem` | `UseMutationResult`<`any`, `unknown`, `RemoveCartItemParams`, `any`\> |

#### Defined in

[mutations/useCartMutations/useRemoveCartItem/useRemoveCartItemMutation.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCartMutations/useRemoveCartItem/useRemoveCartItemMutation.ts#L44)
