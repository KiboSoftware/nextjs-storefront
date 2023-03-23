[next-storefront](../README.md) / useDeleteCartItem

# Module: useDeleteCartItem

## Table of contents

### Functions

- [useDeleteCartItem](useDeleteCartItem.md#usedeletecartitem)

## Functions

### useDeleteCartItem

▸ **useDeleteCartItem**(): `Object`

[Mutation hook] useDeleteCartItem uses the graphQL mutation

<b>deleteCurrentCartItem(cartItemId: String!): Boolean</b>

Description : Removes the product item from the cart

Parameters passed to function deleteCartItem(params: DeleteCartItemParams) => expects object of type DeleteCartItemParams containing cartItemId of the product to be deleted

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`Object`

'response?.deleteCartItemMutation' returns 'true' if product is deleted

| Name             | Type                                                                  |
| :--------------- | :-------------------------------------------------------------------- |
| `deleteCartItem` | `UseMutationResult`<`any`, `unknown`, `DeleteCartItemParams`, `any`\> |

#### Defined in

[mutations/cart/useDeleteCartItem/useDeleteCartItem.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/cart/useDeleteCartItem/useDeleteCartItem.ts#L44)
