[next-storefront](../README.md) / useAddToCartMutation

# Module: useAddToCartMutation

## Table of contents

### Functions

- [useAddToCartMutation](useAddToCartMutation.md#useaddtocartmutation)

## Functions

### useAddToCartMutation

▸ **useAddToCartMutation**(): `Object`

[Mutation hook] useAddToCartMutation uses the graphQL mutation

<b>addItemToCurrentCart(cartItemInput: CrCartItemInput): CartItem</b>

Description : Add the product items to the cart with selected quantity

Parameters passed to function addToCart(props: AddToCartInputParams) => expects object of type 'AddToCartInputParams' containing product and quantity

On success, calls invalidateQueries on cartKeys and fetches the updated result.

#### Returns

`Object`

'response?.addItemToCurrentCart' which contains object of product items added to cart and it's quantity

| Name        | Type                                                                      |
| :---------- | :------------------------------------------------------------------------ |
| `addToCart` | `UseMutationResult`<`any`, `unknown`, `AddToCartInputParams`, `unknown`\> |

#### Defined in

[mutations/useCartMutations/useAddToCart/useAddToCartMutation.ts:56](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCartMutations/useAddToCart/useAddToCartMutation.ts#L56)
