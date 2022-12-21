[next-storefront](../README.md) / useCreateCheckoutDestinationMutations

# Module: useCreateCheckoutDestinationMutations

## Table of contents

### Functions

- [useCreateCheckoutDestinationMutations](useCreateCheckoutDestinationMutations.md#usecreatecheckoutdestinationmutations)

## Functions

### useCreateCheckoutDestinationMutations

▸ **useCreateCheckoutDestinationMutations**(): `UseMutationResult`<`any`, `unknown`, `AddCheckoutDestinationParams`, `unknown`\>

[Mutation hook] useCreateCheckoutDestinationMutations uses the graphQL mutation

<b>createCheckoutDestination(checkoutId: String!,destinationInput: CrDestinationInput): CrDestination</b>

Description : Adds a specific destination to the checkout.

Parameters passed to function addCheckoutDestination(params: AddCheckoutDestinationParams) => expects checkoutId and destinationInput

On success, calls invalidateQueries on checkoutKeys and checkoutDestinationKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `AddCheckoutDestinationParams`, `unknown`\>

'response?.createCheckoutDestination' which contains destinationContact added to the checkout.

#### Defined in

[mutations/multiShip/useCreateCheckoutDestinationMutations/useCreateCheckoutDestinationMutations.tsx:44](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useCreateCheckoutDestinationMutations/useCreateCheckoutDestinationMutations.tsx#L44)
