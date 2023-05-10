[next-storefront](../README.md) / useGetCurrentOrder

# Module: useGetCurrentOrder

## Table of contents

### Functions

- [useGetCurrentOrder](useGetCurrentOrder.md#usegetcurrentorder)

## Functions

### useGetCurrentOrder

▸ **useGetCurrentOrder**(`«destructured»`): `UseCheckoutResponse`

[Query hook] useGetCurrentOrder uses the graphQL query

<b>checkout(checkoutId: String!): Checkout</b>

Description : Fetches the data required on checkout steps(items, fulfillment info, discounts(if any) etc.)

Parameters passed to function getCheckout(checkoutId?: string | null) => expects checkoutId.

On success, returns the checkout

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `UseCheckout` |

#### Returns

`UseCheckoutResponse`

'response?.checkout' which contains checkout details

#### Defined in

[queries/standardCheckout/useGetCurrentOrder/useGetCurrentOrder.ts:54](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/standardCheckout/useGetCurrentOrder/useGetCurrentOrder.ts#L54)
