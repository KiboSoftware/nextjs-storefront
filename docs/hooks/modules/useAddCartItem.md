[next-storefront](../README.md) / useAddCartItem

# Module: useAddCartItem

## Table of contents

### Functions

- [useAddCartItem](useAddCartItem.md#useaddcartitem)

## Functions

### useAddCartItem

▸ **useAddCartItem**(): `Object`

[Mutation hook] useAddCartItem uses the graphQL mutation

<b>addItemToCurrentCart(cartItemInput: CrCartItemInput): CartItem</b>

Description : Add the product items to the cart with selected quantity

Parameters passed to function addToCart(props: AddCartItemParams) => expects object of type 'AddCartItemParams' containing product and quantity

On success, calls invalidateQueries on cartKeys and fetches the updated result.

#### Returns

`Object`

'response?.addItemToCurrentCart' which contains object of product items added to cart and it's quantity

| Name | Type |
| :------ | :------ |
| `addToCart` | `UseMutationResult`<`any`, `unknown`, `AddCartItemParams`, `unknown`\> |

#### Defined in

[mutations/cart/useAddCartItem/useAddCartItem.ts:58](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/cart/useAddCartItem/useAddCartItem.ts#L58)
