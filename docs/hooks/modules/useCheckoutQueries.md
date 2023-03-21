[next-storefront](../README.md) / useGetCurrentOrder

# Module: useGetCurrentOrder

## Table of contents

### Functions

- [useGetCurrentOrder](useGetCurrentOrder.md#usecheckoutqueries)

## Functions

### useGetCurrentOrder

▸ **useGetCurrentOrder**(`__namedParameters`): `UseCheckoutResponse`

[Query hook] useGetCurrentOrder uses the graphQL query

<b>checkout(checkoutId: String!): Checkout</b>

Description : Fetches the data required on checkout steps(items, fulfillment info, discounts(if any) etc.)

Parameters passed to function getCheckout(checkoutId?: string | null) => expects checkoutId.

On success, returns the checkout

#### Parameters

| Name                | Type          |
| :------------------ | :------------ |
| `__namedParameters` | `UseCheckout` |

#### Returns

`UseCheckoutResponse`

'response?.checkout' which contains checkout details

#### Defined in

[queries/useGetCurrentOrder/useGetCurrentOrder.ts:53](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useGetCurrentOrder/useGetCurrentOrder.ts#L53)
