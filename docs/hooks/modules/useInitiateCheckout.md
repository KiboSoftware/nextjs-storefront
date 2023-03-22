[next-storefront](../README.md) / useInitiateCheckout

# Module: useInitiateCheckout

## Table of contents

### Functions

- [useInitiateCheckout](useInitiateCheckout.md#useinitiatecheckout)

## Functions

### useInitiateCheckout

▸ **useInitiateCheckout**(): `Object`

[Mutation hook] useInitiateCheckout uses the graphQL mutation

<b>createCheckout(cartId: String): Checkout</b>

Description : Creates a new checkout from an existing cart, that is, when the customer chooses to proceed to checkout.

Parameters passed to function createCheckout(cartId?: string | null) => expects cartId

#### Returns

`Object`

'response?.checkout' which contains which contains data for checkout pages(product items, fulfillment method etc.;)

| Name | Type |
| :------ | :------ |
| `createMultiShipCheckoutFromCart` | `UseMutationResult`<`any`, `unknown`, `undefined` \| ``null`` \| `string`, `unknown`\> |

#### Defined in

[mutations/multishipCheckout/useInitiateCheckout/useInitiateCheckout.tsx:31](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useInitiateCheckout/useInitiateCheckout.tsx#L31)
