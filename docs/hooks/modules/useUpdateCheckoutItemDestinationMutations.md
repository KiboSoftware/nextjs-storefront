[next-storefront](../README.md) / useUpdateCheckoutItemDestinationMutations

# Module: useUpdateCheckoutItemDestinationMutations

## Table of contents

### Functions

- [useUpdateCheckoutItemDestinationMutations](useUpdateCheckoutItemDestinationMutations.md#useupdatecheckoutitemdestinationmutations)

## Functions

### useUpdateCheckoutItemDestinationMutations

▸ **useUpdateCheckoutItemDestinationMutations**(): `UseMutationResult`<`any`, `unknown`, `UseCheckoutItemDestination`, `unknown`\>

[Mutation hook] useUpdateCheckoutItemDestinationMutations uses the graphQL mutation

<b>updateCheckoutItemDestination(checkoutId: String!, itemId: String!, destinationId: String!): Checkout</b>

Description : Associate an item in multiship to a destination.

Parameters passed to function setCheckoutItemDestination(params: UseCheckoutItemDestination) => expects checkoutId, destinationId and itemId

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UseCheckoutItemDestination`, `unknown`\>

'response?.updateCheckoutItemDestination' which contains the groupings of each item associated with a destination in multiship.

#### Defined in

[mutations/multiShip/useUpdateCheckoutItemDestinationMutations/useUpdateCheckoutItemDestinationMutations.tsx:43](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useUpdateCheckoutItemDestinationMutations/useUpdateCheckoutItemDestinationMutations.tsx#L43)
