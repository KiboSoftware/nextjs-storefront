[next-storefront](../README.md) / useCreateCheckout

# Module: useCreateCheckout

## Table of contents

### Functions

- [useCreateCheckout](useCreateCheckout.md#usecreatecheckout)

## Functions

### useCreateCheckout

▸ **useCreateCheckout**(): `UseMutationResult`<`any`, `unknown`, `Checkout`, `unknown`\>

[Mutation hook] useCreateCheckout uses the graphQL mutation

<b>createCheckoutAction(checkoutId: String!,checkoutActionInput: CheckoutActionInput): Checkout</b>

Description : Perform an action on the checkout and places the new order. Available actions depend on the current state of the checkout.

Parameters passed to function createCheckout(checkout: Checkout)

On success, calls removeQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `Checkout`, `unknown`\>

'response?.createCheckoutAction' which contains multi ship items order details including orderId, shipping details, items etc.

#### Defined in

[mutations/multishipCheckout/useCreateCheckout/useCreateCheckout.tsx:48](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useCreateCheckout/useCreateCheckout.tsx#L48)
