[next-storefront](../README.md) / useUpdateDestination

# Module: useUpdateDestination

## Table of contents

### Functions

- [useUpdateDestination](useUpdateDestination.md#useupdatedestination)

## Functions

### useUpdateDestination

▸ **useUpdateDestination**(): `UseMutationResult`<`any`, `unknown`, `UseCheckoutDestination`, `unknown`\>

[Mutation hook] useUpdateDestination uses the graphQL mutation

<b>updateCheckoutDestination(checkoutId: String!, destinationId: String!, destinationInput: CrDestinationInput): CrDestination</b>

Description : Updates a destination specified by checkout Id and destination Id.

Parameters passed to function setCheckoutDestination(params: UseCheckoutDestination) => expects checkoutId, destinationId and destinationInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UseCheckoutDestination`, `unknown`\>

'response?.updateCheckoutDestination' which contains the updated destinationContact details.

#### Defined in

[mutations/multishipCheckout/useUpdateDestination/useUpdateDestination.tsx:45](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useUpdateDestination/useUpdateDestination.tsx#L45)
