[next-storefront](../README.md) / useUpdateItemDestination

# Module: useUpdateItemDestination

## Table of contents

### Functions

- [useUpdateItemDestination](useUpdateItemDestination.md#useupdateitemdestination)

## Functions

### useUpdateItemDestination

▸ **useUpdateItemDestination**(): `UseMutationResult`<`any`, `unknown`, `UseCheckoutItemDestination`, `unknown`\>

[Mutation hook] useUpdateItemDestination uses the graphQL mutation

<b>updateCheckoutItemDestination(checkoutId: String!, itemId: String!, destinationId: String!): Checkout</b>

Description : Associate an item in multiship to a destination.

Parameters passed to function setCheckoutItemDestination(params: UseCheckoutItemDestination) => expects checkoutId, destinationId and itemId

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UseCheckoutItemDestination`, `unknown`\>

'response?.updateCheckoutItemDestination' which contains the groupings of each item associated with a destination in multiship.

#### Defined in

[mutations/multishipCheckout/useUpdateItemDestination/useUpdateItemDestination.tsx:43](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useUpdateItemDestination/useUpdateItemDestination.tsx#L43)
