[next-storefront](../README.md) / useMultiShipCheckoutQueries

# Module: useMultiShipCheckoutQueries

## Table of contents

### Functions

- [useMultiShipCheckoutQueries](useMultiShipCheckoutQueries.md#usemultishipcheckoutqueries)

## Functions

### useMultiShipCheckoutQueries

▸ **useMultiShipCheckoutQueries**(`__namedParameters`): `UseMultiShipCheckoutResponse`

[Query hook] useMultiShipCheckoutQueries uses the graphQL query

<b>checkout(checkoutId: String!): Checkout</b>

Description : Retrieves the details of a checkout specified by the checkout ID.

Parameters passed to function getCheckout(checkoutId: string) => expects checkoutId

#### Parameters

| Name                | Type                   |
| :------------------ | :--------------------- |
| `__namedParameters` | `UseMultiShipCheckout` |

#### Returns

`UseMultiShipCheckoutResponse`

'response?.checkout' which contains details related to checkout page like items details, shipping Information etc.;

#### Defined in

[queries/multiShip/useCheckoutQueries/useCheckoutQueries.ts:36](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/multiShip/useCheckoutQueries/useCheckoutQueries.ts#L36)
