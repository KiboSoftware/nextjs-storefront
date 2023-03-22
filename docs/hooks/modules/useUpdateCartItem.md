[next-storefront](../README.md) / useUpdateCartItem

# Module: useUpdateCartItem

## Table of contents

### Functions

- [useUpdateCartItem](useUpdateCartItem.md#useupdatecartitem)

## Functions

### useUpdateCartItem

▸ **useUpdateCartItem**(): `Object`

[Mutation hook] useUpdateCartItem uses the graphQL mutation

<b>updateCurrentCartItem(cartItemId: String!, cartItemInput: CrCartItemInput): CartItem</b>

Description : Updates the 'fulfillmentMethod(Shipping/Pickup in store)' and 'fulfillmentLocationCode' based on selected option on cart page

Parameters passed to function updateCartItem(props: UpdateCartItemParams) => expects object of type 'UpdateCartItemParams' containing cartItemId and cartItemInput

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`Object`

'response?.updateCurrentCartItem' which contains the updated fulfillmentMethod and fulfillmentLocationCode

| Name | Type |
| :------ | :------ |
| `updateCartItem` | `UseMutationResult`<`any`, `unknown`, `UpdateCartItemParams`, `any`\> |

#### Defined in

[mutations/cart/useUpdateCartItem/useUpdateCartItem.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/cart/useUpdateCartItem/useUpdateCartItem.ts#L47)
