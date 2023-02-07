[next-storefront](../README.md) / useUpdateMultiShipCheckoutPersonalInfoMutation

# Module: useUpdateMultiShipCheckoutPersonalInfoMutation

## Table of contents

### Functions

- [useUpdateMultiShipCheckoutPersonalInfoMutation](useUpdateMultiShipCheckoutPersonalInfoMutation.md#useupdatemultishipcheckoutpersonalinfomutation)

## Functions

### useUpdateMultiShipCheckoutPersonalInfoMutation

▸ **useUpdateMultiShipCheckoutPersonalInfoMutation**(): `UseMutationResult`<`any`, `unknown`, `MultiShipPersonalInfo`, `unknown`\>

[Mutation hook] useUpdateMultiShipCheckoutPersonalInfoMutation uses the graphQL mutation

<b>updateCheckout(checkoutId: String!, checkoutInput: CheckoutInput): Checkout</b>

Description : Updates the details(like email id) of a checkout specified by the checkout ID.

Parameters passed to function updatePersonalInfo({ checkout, email }: MultiShipPersonalInfo) => expects checkoutId and email

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `MultiShipPersonalInfo`, `unknown`\>

'response?.checkout' which contains the updated personal details(email id)

#### Defined in

[mutations/multiShip/useUpdateCheckoutPersonalInfoMutation/useUpdateCheckoutPersonalInfoMutation.tsx:38](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useUpdateCheckoutPersonalInfoMutation/useUpdateCheckoutPersonalInfoMutation.tsx#L38)
