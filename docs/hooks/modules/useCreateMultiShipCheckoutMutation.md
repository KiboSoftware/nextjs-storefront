[next-storefront](../README.md) / useCreateMultiShipCheckoutMutation

# Module: useCreateMultiShipCheckoutMutation

## Table of contents

### Functions

- [useCreateMultiShipCheckoutMutation](useCreateMultiShipCheckoutMutation.md#usecreatemultishipcheckoutmutation)

## Functions

### useCreateMultiShipCheckoutMutation

▸ **useCreateMultiShipCheckoutMutation**(): `UseMutationResult`<`any`, `unknown`, `Checkout`, `unknown`\>

[Mutation hook] useCreateMultiShipCheckoutMutation uses the graphQL mutation

<b>createCheckoutAction(checkoutId: String!,checkoutActionInput: CheckoutActionInput): Checkout</b>

Description : Perform an action on the checkout and places the new order. Available actions depend on the current state of the checkout.

Parameters passed to function createCheckout(checkout: Checkout)

On success, calls removeQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `Checkout`, `unknown`\>

'response?.createCheckoutAction' which contains multi ship items order details including orderId, shipping details, items etc.

#### Defined in

[mutations/multiShip/useCreateCheckoutActionMutation/useCreateCheckoutActionMutation.tsx:35](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useCreateCheckoutActionMutation/useCreateCheckoutActionMutation.tsx#L35)
