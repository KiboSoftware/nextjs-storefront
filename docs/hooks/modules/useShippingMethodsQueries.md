[next-storefront](../README.md) / useShippingMethodsQueries

# Module: useShippingMethodsQueries

## Table of contents

### Functions

- [useShippingMethodsQueries](useShippingMethodsQueries.md#useshippingmethodsqueries)

## Functions

### useShippingMethodsQueries

▸ **useShippingMethodsQueries**(`checkoutId`, `isNewAddressAdded?`, `selectedShippingAddressId?`): `UseShippingMethodsResponse`

[Query hook] useShippingMethodsQueries uses the graphQL query

<b>orderShipmentMethods(orderId: String!): [ShippingRate]</b>

Description : Fetches the shipping methods based on checkout id.

Parameters passed to function loadShippingMethods(checkoutId: string) => expects checkoutId

On success, returns the received list of shipping methods.

#### Parameters

| Name                         | Type                              | Description                 |
| :--------------------------- | :-------------------------------- | :-------------------------- |
| `checkoutId`                 | `undefined` \| `null` \| `string` | Accepts created checkout id |
| `isNewAddressAdded?`         | `boolean`                         | -                           |
| `selectedShippingAddressId?` | `number`                          | -                           |

#### Returns

`UseShippingMethodsResponse`

'response?.orderShipmentMethods', which contains shipping methods based on checkoutId request.

#### Defined in

[queries/useShippingMethodsQueries/useShippingMethodsQueries.tsx:48](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useShippingMethodsQueries/useShippingMethodsQueries.tsx#L48)
