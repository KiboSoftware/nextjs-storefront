[next-storefront](../README.md) / useGetDestinations

# Module: useGetDestinations

## Table of contents

### Functions

- [useGetDestinations](useGetDestinations.md#usegetdestinations)

## Functions

### useGetDestinations

▸ **useGetDestinations**(`params`): `UseDestinationsResponse`

[Query hook] useGetDestinations uses the graphQL query

<b>checkoutDestinations(checkoutId: String!): [CrDestination]</b>

Description : Gets all the destinations specified by the checkout Id.

Parameters passed to function getCheckoutDestinations(params: UseDestinations) => expects checkoutId

#### Parameters

| Name     | Type              | Description       |
| :------- | :---------------- | :---------------- |
| `params` | `UseDestinations` | stores checkoutId |

#### Returns

`UseDestinationsResponse`

'response?.checkoutDestinations' which contains all the destinations of the specified checkout Id

#### Defined in

[queries/multishipCheckout/useGetDestinations/useGetDestinations.tsx:48](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/multishipCheckout/useGetDestinations/useGetDestinations.tsx#L48)
