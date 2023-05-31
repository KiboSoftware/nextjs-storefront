[next-storefront](../README.md) / useGetDestination

# Module: useGetDestination

## Table of contents

### Functions

- [useGetDestination](useGetDestination.md#usegetdestination)

## Functions

### useGetDestination

▸ **useGetDestination**(`params`): `UseDestinationResponse`

[Query hook] useGetDestination uses the graphQL query

<b>checkoutDestination(checkoutId: String!, destinationId: String!): CrDestination</b>

Description : Gets a destination specified by the checkout Id and destination Id.

Parameters passed to function getCheckoutDestination(params: UseDestination) => expects checkoutId and destinationId

#### Parameters

| Name     | Type             | Description                         |
| :------- | :--------------- | :---------------------------------- |
| `params` | `UseDestination` | stores checkoutId and destinationId |

#### Returns

`UseDestinationResponse`

'response?.checkoutDestination' which contains destination of the specified destinationId

#### Defined in

[queries/multishipCheckout/useGetDestination/useGetDestination.tsx:49](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/multishipCheckout/useGetDestination/useGetDestination.tsx#L49)
