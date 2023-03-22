[next-storefront](../README.md) / useUpdateCartItemQuantity

# Module: useUpdateCartItemQuantity

## Table of contents

### Functions

- [useUpdateCartItemQuantity](useUpdateCartItemQuantity.md#useupdatecartitemquantity)

## Functions

### useUpdateCartItemQuantity

▸ **useUpdateCartItemQuantity**(): `Object`

[Mutation hook] useUpdateCartItemQuantity uses the graphQL mutation

<b>updateCurrentCartItemQuantity(cartItemId: String!, quantity: Int!): CartItem</b>

Description : Updates the quantity of items currently in the cart

Parameters passed to function updateCartItemQuantity(params: UpdateCartItemQuantityParams) => expects object of type 'UpdateCartItemQuantityParams' containing cartItemId and quantity

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`Object`

'response?.updateCartItemQuantity' which contains updated quantity for the items present in the cart

| Name | Type |
| :------ | :------ |
| `updateCartItemQuantity` | `UseMutationResult`<`any`, `unknown`, `UpdateCartItemQuantityParams`, `any`\> |

#### Defined in

[mutations/cart/useUpdateCartItemQuantity/useUpdateCartItemQuantity.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/cart/useUpdateCartItemQuantity/useUpdateCartItemQuantity.ts#L46)
