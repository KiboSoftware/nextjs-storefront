[next-storefront](../README.md) / useCreateDestination

# Module: useCreateDestination

## Table of contents

### Functions

- [useCreateDestination](useCreateDestination.md#usecreatedestination)

## Functions

### useCreateDestination

▸ **useCreateDestination**(): `UseMutationResult`<`any`, `unknown`, `AddCheckoutDestinationParams`, `unknown`\>

[Mutation hook] useCreateDestination uses the graphQL mutation

<b>createCheckoutDestination(checkoutId: String!,destinationInput: CrDestinationInput): CrDestination</b>

Description : Adds a specific destination to the checkout.

Parameters passed to function addCheckoutDestination(params: AddCheckoutDestinationParams) => expects checkoutId and destinationInput

On success, calls invalidateQueries on checkoutKeys and checkoutDestinationKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `AddCheckoutDestinationParams`, `unknown`\>

'response?.createCheckoutDestination' which contains destinationContact added to the checkout.

#### Defined in

[mutations/multishipCheckout/useCreateDestination/useCreateDestination.tsx:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useCreateDestination/useCreateDestination.tsx#L44)
