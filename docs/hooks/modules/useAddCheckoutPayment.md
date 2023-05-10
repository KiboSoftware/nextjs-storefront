[next-storefront](../README.md) / useAddCheckoutPayment

# Module: useAddCheckoutPayment

## Table of contents

### Functions

- [useAddCheckoutPayment](useAddCheckoutPayment.md#useaddcheckoutpayment)

## Functions

### useAddCheckoutPayment

▸ **useAddCheckoutPayment**(): `UseMutationResult`<`any`, `unknown`, `CheckoutPaymentActionInput`, `unknown`\>

[Mutation hook] useAddCheckoutPayment uses the graphQL mutation

<b>createCheckoutPaymentAction(checkoutId: String!, paymentActionInput: PaymentActionInput): Checkout</b>

Description : Sets the action of the specified payment transaction interaction. Available actions depend on the current status of the payment transaction.

Parameters passed to function createCheckoutPayment(params: CheckoutPaymentActionInput) => expects checkoutId and paymentAction

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `CheckoutPaymentActionInput`, `unknown`\>

'response?.createCheckoutPaymentAction' which contains payment related information

#### Defined in

[mutations/multishipCheckout/useAddCheckoutPayment/useAddCheckoutPayment.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useAddCheckoutPayment/useAddCheckoutPayment.ts#L44)
