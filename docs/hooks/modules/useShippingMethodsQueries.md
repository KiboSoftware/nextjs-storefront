[next-storefront](../README.md) / useGetShippingMethods

# Module: useGetShippingMethods

## Table of contents

### Functions

- [useGetShippingMethods](useGetShippingMethods.md#useshippingmethodsqueries)

## Functions

### useGetShippingMethods

▸ **useGetShippingMethods**(`checkoutId`, `isNewAddressAdded?`, `selectedShippingAddressId?`): `UseShippingMethodsResponse`

[Query hook] useGetShippingMethods uses the graphQL query

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

[queries/useGetShippingMethods/useGetShippingMethods.tsx:48](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useGetShippingMethods/useGetShippingMethods.tsx#L48)
