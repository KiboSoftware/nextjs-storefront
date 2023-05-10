[next-storefront](../README.md) / useCreateCheckoutShippingMethod

# Module: useCreateCheckoutShippingMethod

## Table of contents

### Functions

- [useCreateCheckoutShippingMethod](useCreateCheckoutShippingMethod.md#usecreatecheckoutshippingmethod)

## Functions

### useCreateCheckoutShippingMethod

▸ **useCreateCheckoutShippingMethod**(): `UseMutationResult`<`any`, `unknown`, `MultiShipCreateCheckoutShippingMethod`, `unknown`\>

[Mutation hook] useCreateCheckoutShippingMethod uses the graphQL mutation

<b>createCheckoutShippingMethod(checkoutId: String!, checkoutGroupShippingMethodInput: [CheckoutGroupShippingMethodInput]): Checkout</b>

Description : Sets the shipping method for specified groupings in multi ship.

Parameters passed to function setCheckoutShippingMethod(checkoutShippingMethod: MultiShipCreateCheckoutShippingMethod) => expects checkoutId and checkoutGroupShippingMethodInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `MultiShipCreateCheckoutShippingMethod`, `unknown`\>

'response?.checkout' which contains shipping methods and shipping price for the groupings

#### Defined in

[mutations/multishipCheckout/useCreateCheckoutShippingMethod/useCreateCheckoutShippingMethod.tsx:46](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useCreateCheckoutShippingMethod/useCreateCheckoutShippingMethod.tsx#L46)
