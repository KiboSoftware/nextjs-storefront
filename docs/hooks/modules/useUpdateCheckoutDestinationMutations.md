[next-storefront](../README.md) / useUpdateCheckoutDestinationMutations

# Module: useUpdateCheckoutDestinationMutations

## Table of contents

### Functions

- [useUpdateCheckoutDestinationMutations](useUpdateCheckoutDestinationMutations.md#useupdatecheckoutdestinationmutations)

## Functions

### useUpdateCheckoutDestinationMutations

▸ **useUpdateCheckoutDestinationMutations**(): `UseMutationResult`<`any`, `unknown`, `UseCheckoutDestination`, `unknown`\>

[Mutation hook] useUpdateCheckoutDestinationMutations uses the graphQL mutation

<b>updateCheckoutDestination(checkoutId: String!, destinationId: String!, destinationInput: CrDestinationInput): CrDestination</b>

Description : Updates a destination specified by checkout Id and destination Id.

Parameters passed to function setCheckoutDestination(params: UseCheckoutDestination) => expects checkoutId, destinationId and destinationInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UseCheckoutDestination`, `unknown`\>

'response?.updateCheckoutDestination' which contains the updated destinationContact details.

#### Defined in

[mutations/multiShip/useUpdateCheckoutDestinationMutations/useUpdateCheckoutDestinationMutations.tsx:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useUpdateCheckoutDestinationMutations/useUpdateCheckoutDestinationMutations.tsx#L45)
