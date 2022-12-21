[next-storefront](../README.md) / useCheckoutQueries

# Module: useCheckoutQueries

## Table of contents

### Functions

- [useCheckoutQueries](useCheckoutQueries.md#usecheckoutqueries)

## Functions

### useCheckoutQueries

▸ **useCheckoutQueries**(`__namedParameters`): `UseCheckoutResponse`

[Query hook] useCheckoutQueries uses the graphQL query

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

[queries/useCheckoutQueries/useCheckoutQueries.ts:53](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useCheckoutQueries/useCheckoutQueries.ts#L53)
