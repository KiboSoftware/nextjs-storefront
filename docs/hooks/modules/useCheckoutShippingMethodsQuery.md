[next-storefront](../README.md) / useCheckoutShippingMethodsQuery

# Module: useCheckoutShippingMethodsQuery

## Table of contents

### Functions

- [useCheckoutShippingMethodsQuery](useCheckoutShippingMethodsQuery.md#usecheckoutshippingmethodsquery)

## Functions

### useCheckoutShippingMethodsQuery

▸ **useCheckoutShippingMethodsQuery**(`checkoutId`, `selectedShippingAddressId?`): `UseCheckoutShippingMethodsResponse`

[Query hook] useCheckoutShippingMethodsQuery uses the graphQL query

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

[queries/multiShip/useCheckoutShippingMethodsQuery/useCheckoutShippingMethodsQuery.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/multiShip/useCheckoutShippingMethodsQuery/useCheckoutShippingMethodsQuery.ts#L45)
