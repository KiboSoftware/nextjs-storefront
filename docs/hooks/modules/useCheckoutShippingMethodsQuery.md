[next-storefront](../README.md) / useGetCheckoutShippingMethods

# Module: useGetCheckoutShippingMethods

## Table of contents

### Functions

- [useGetCheckoutShippingMethods](useGetCheckoutShippingMethods.md#usecheckoutshippingmethodsquery)

## Functions

### useGetCheckoutShippingMethods

▸ **useGetCheckoutShippingMethods**(`checkoutId`, `selectedShippingAddressId?`): `UseCheckoutShippingMethodsResponse`

[Query hook] useGetCheckoutShippingMethods uses the graphQL query

<b>checkoutShippingMethods(checkoutId: String!): [CheckoutGroupRates]</b>

Description : Retrieves available shipping methods for groupings. Typically used to display available shipping method options on the checkout page.

Parameters passed to function loadShippingMethods(checkoutId: string) => expects checkoutId

#### Parameters

| Name                         | Type                              | Description                                |
| :--------------------------- | :-------------------------------- | :----------------------------------------- |
| `checkoutId`                 | `undefined` \| `null` \| `string` | stores checkoutId                          |
| `selectedShippingAddressId?` | `null` \| `string`                | stores the id of selected shipping address |

#### Returns

`UseCheckoutShippingMethodsResponse`

'response?.checkout' which contains available shipping methods for groupings

#### Defined in

[queries/multiShip/useGetCheckoutShippingMethods/useGetCheckoutShippingMethods.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/multiShip/useGetCheckoutShippingMethods/useGetCheckoutShippingMethods.ts#L45)
