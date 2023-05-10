[next-storefront](../README.md) / useUpdateCheckoutPersonalInfo

# Module: useUpdateCheckoutPersonalInfo

## Table of contents

### Functions

- [useUpdateCheckoutPersonalInfo](useUpdateCheckoutPersonalInfo.md#useupdatecheckoutpersonalinfo)

## Functions

### useUpdateCheckoutPersonalInfo

▸ **useUpdateCheckoutPersonalInfo**(): `UseMutationResult`<`any`, `unknown`, `MultiShipPersonalInfo`, `unknown`\>

[Mutation hook] useUpdateCheckoutPersonalInfo uses the graphQL mutation

<b>updateCheckout(checkoutId: String!, checkoutInput: CheckoutInput): Checkout</b>

Description : Updates the details(like email id) of a checkout specified by the checkout ID.

Parameters passed to function updatePersonalInfo({ checkout, email }: MultiShipPersonalInfo) => expects checkoutId and email

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `MultiShipPersonalInfo`, `unknown`\>

'response?.checkout' which contains the updated personal details(email id)

#### Defined in

[mutations/multishipCheckout/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfo.tsx:53](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfo.tsx#L53)
