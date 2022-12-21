[next-storefront](../README.md) / useUpdateCartItemQuantityMutation

# Module: useUpdateCartItemQuantityMutation

## Table of contents

### Functions

- [useUpdateCartItemQuantityMutation](useUpdateCartItemQuantityMutation.md#useupdatecartitemquantitymutation)

## Functions

### useUpdateCartItemQuantityMutation

▸ **useUpdateCartItemQuantityMutation**(): `Object`

[Mutation hook] useUpdateCartItemQuantityMutation uses the graphQL mutation

<b>updateCurrentCartItemQuantity(cartItemId: String!, quantity: Int!): CartItem</b>

Description : Updates the quantity of items currently in the cart

Parameters passed to function updateCartItemQuantity(params: UpdateCartItemQuantityParams) => expects object of type 'UpdateCartItemQuantityParams' containing cartItemId and quantity

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`Object`

'response?.updateCartItemQuantity' which contains updated quantity for the items present in the cart

| Name                     | Type                                                                          |
| :----------------------- | :---------------------------------------------------------------------------- |
| `updateCartItemQuantity` | `UseMutationResult`<`any`, `unknown`, `UpdateCartItemQuantityParams`, `any`\> |

#### Defined in

[mutations/useCartMutations/useUpdateCartItemQuantity/useUpdateCartItemQuantityMutation.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCartMutations/useUpdateCartItemQuantity/useUpdateCartItemQuantityMutation.ts#L46)
