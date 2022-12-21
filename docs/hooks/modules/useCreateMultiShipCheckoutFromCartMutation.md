[next-storefront](../README.md) / useCreateMultiShipCheckoutFromCartMutation

# Module: useCreateMultiShipCheckoutFromCartMutation

## Table of contents

### Functions

- [useCreateMultiShipCheckoutFromCartMutation](useCreateMultiShipCheckoutFromCartMutation.md#usecreatemultishipcheckoutfromcartmutation)

## Functions

### useCreateMultiShipCheckoutFromCartMutation

▸ **useCreateMultiShipCheckoutFromCartMutation**(): `Object`

[Mutation hook] useCreateMultiShipCheckoutFromCartMutation uses the graphQL mutation

<b>createCheckout(cartId: String): Checkout</b>

Description : Creates a new checkout from an existing cart, that is, when the customer chooses to proceed to checkout.

Parameters passed to function createCheckout(cartId?: string | null) => expects cartId

#### Returns

`Object`

'response?.checkout' which contains which contains data for checkout pages(product items, fulfillment method etc.;)

| Name                              | Type                                                                                 |
| :-------------------------------- | :----------------------------------------------------------------------------------- |
| `createMultiShipCheckoutFromCart` | `UseMutationResult`<`any`, `unknown`, `undefined` \| `null` \| `string`, `unknown`\> |

#### Defined in

[mutations/multiShip/useCreateCheckoutFromCartMutation/useCreateCheckoutFromCartMutation.tsx:20](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useCreateCheckoutFromCartMutation/useCreateCheckoutFromCartMutation.tsx#L20)
