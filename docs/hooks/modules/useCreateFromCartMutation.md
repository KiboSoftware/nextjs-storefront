[next-storefront](../README.md) / useCreateFromCartMutation

# Module: useCreateFromCartMutation

## Table of contents

### Functions

- [useCreateFromCartMutation](useCreateFromCartMutation.md#usecreatefromcartmutation)

## Functions

### useCreateFromCartMutation

▸ **useCreateFromCartMutation**(): `Object`

[Mutation hook] useCreateFromCartMutation uses the graphQL mutation

<b>createOrder(cartId: String, quoteId: String, orderInput: OrderInput): Order</b>

Description : Prepares data for checkout page from cart

Parameters passed to function getOrCreateCheckout(cartId?: string | null) => expects cartId

#### Returns

`Object`

'response?.checkout' which contains data for checkout pages(product items, fulfillment method etc.;)

| Name             | Type                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------- |
| `createFromCart` | `UseMutationResult`<`any`, `unknown`, `undefined` \| `null` \| `string`, `unknown`\> |

#### Defined in

[mutations/useCheckoutMutations/useCreateFromCartMutation.tsx:31](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCheckoutMutations/useCreateFromCartMutation.tsx#L31)
