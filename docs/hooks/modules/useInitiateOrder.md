[next-storefront](../README.md) / useInitiateOrder

# Module: useInitiateOrder

## Table of contents

### Functions

- [useInitiateOrder](useInitiateOrder.md#useinitiateorder)

## Functions

### useInitiateOrder

▸ **useInitiateOrder**(): `Object`

[Mutation hook] useInitiateOrder uses the graphQL mutation

<b>createOrder(cartId: String, quoteId: String, orderInput: OrderInput): Order</b>

Description : Prepares data for checkout page from cart

Parameters passed to function getOrCreateCheckout(cartId?: string | null) => expects cartId

#### Returns

`Object`

'response?.checkout' which contains data for checkout pages(product items, fulfillment method etc.;)

| Name            | Type                                                                                 |
| :-------------- | :----------------------------------------------------------------------------------- |
| `initiateOrder` | `UseMutationResult`<`any`, `unknown`, `undefined` \| `null` \| `string`, `unknown`\> |

#### Defined in

[mutations/standardCheckout/useInitiateOrder/useInitiateOrder.tsx:31](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useInitiateOrder/useInitiateOrder.tsx#L31)
