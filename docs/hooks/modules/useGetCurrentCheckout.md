[next-storefront](../README.md) / useGetCurrentCheckout

# Module: useGetCurrentCheckout

## Table of contents

### Functions

- [useGetCurrentCheckout](useGetCurrentCheckout.md#usegetcurrentcheckout)

## Functions

### useGetCurrentCheckout

▸ **useGetCurrentCheckout**(`«destructured»`): `UseMultiShipCheckoutResponse`

[Query hook] useGetCurrentCheckout uses the graphQL query

<b>checkout(checkoutId: String!): Checkout</b>

Description : Retrieves the details of a checkout specified by the checkout ID.

Parameters passed to function getCheckout(checkoutId: string) => expects checkoutId

#### Parameters

| Name             | Type                   |
| :--------------- | :--------------------- |
| `«destructured»` | `UseMultiShipCheckout` |

#### Returns

`UseMultiShipCheckoutResponse`

'response?.checkout' which contains details related to checkout page like items details, shipping Information etc.;

#### Defined in

[queries/multishipCheckout/useGetCurrentCheckout/useGetCurrentCheckout.ts:48](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/multishipCheckout/useGetCurrentCheckout/useGetCurrentCheckout.ts#L48)
