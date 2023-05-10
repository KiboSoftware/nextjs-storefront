[next-storefront](../README.md) / useVoidCheckoutPayment

# Module: useVoidCheckoutPayment

## Table of contents

### Functions

- [useVoidCheckoutPayment](useVoidCheckoutPayment.md#usevoidcheckoutpayment)

## Functions

### useVoidCheckoutPayment

▸ **useVoidCheckoutPayment**(): `UseMutationResult`<`any`, `unknown`, `UpdateCheckoutPaymentActionInput`, `unknown`\>

[Mutation hook] useVoidCheckoutPayment uses the graphQL mutation

<b>updateCheckoutPayment(checkoutId: String!,paymentId: String!,paymentActionInput: PaymentActionInput): Checkout</b>

Description : Updates the payment information

Parameters passed to function updateCheckoutPayment(props: UpdateCheckoutPaymentActionInput) => expects checkoutId, paymentId and object paymentActionInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateCheckoutPaymentActionInput`, `unknown`\>

'response?.updateCheckoutPaymentAction' which contains object of updated checkout information

#### Defined in

[mutations/multishipCheckout/useVoidCheckoutPayment/useVoidCheckoutPayment.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useVoidCheckoutPayment/useVoidCheckoutPayment.ts#L44)
