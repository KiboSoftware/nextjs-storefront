[next-storefront](../README.md) / useCreateCheckoutShippingMethodMutation

# Module: useCreateCheckoutShippingMethodMutation

## Table of contents

### Functions

- [useCreateCheckoutShippingMethodMutation](useCreateCheckoutShippingMethodMutation.md#usecreatecheckoutshippingmethodmutation)

## Functions

### useCreateCheckoutShippingMethodMutation

▸ **useCreateCheckoutShippingMethodMutation**(): `UseMutationResult`<`any`, `unknown`, `MultiShipCreateCheckoutShippingMethod`, `unknown`\>

[Mutation hook] useCreateCheckoutShippingMethodMutation uses the graphQL mutation

<b>createCheckoutShippingMethod(checkoutId: String!, checkoutGroupShippingMethodInput: [CheckoutGroupShippingMethodInput]): Checkout</b>

Description : Sets the shipping method for specified groupings in multi ship.

Parameters passed to function setCheckoutShippingMethod(checkoutShippingMethod: MultiShipCreateCheckoutShippingMethod) => expects checkoutId and checkoutGroupShippingMethodInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `MultiShipCreateCheckoutShippingMethod`, `unknown`\>

'response?.checkout' which contains shipping methods and shipping price for the groupings

#### Defined in

[mutations/multiShip/useCreateCheckoutShippingMethodMutation/useCreateCheckoutShippingMethodMutation.tsx:46](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useCreateCheckoutShippingMethodMutation/useCreateCheckoutShippingMethodMutation.tsx#L46)
