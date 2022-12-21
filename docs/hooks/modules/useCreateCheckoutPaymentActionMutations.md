[next-storefront](../README.md) / useCreateCheckoutPaymentActionMutations

# Module: useCreateCheckoutPaymentActionMutations

## Table of contents

### Functions

- [useCreateCheckoutPaymentActionMutations](useCreateCheckoutPaymentActionMutations.md#usecreatecheckoutpaymentactionmutations)

## Functions

### useCreateCheckoutPaymentActionMutations

▸ **useCreateCheckoutPaymentActionMutations**(): `UseMutationResult`<`any`, `unknown`, `CheckoutPaymentActionInput`, `unknown`\>

[Mutation hook] useCreateCheckoutPaymentActionMutations uses the graphQL mutation

<b>createCheckoutPaymentAction(checkoutId: String!, paymentActionInput: PaymentActionInput): Checkout</b>

Description : Sets the action of the specified payment transaction interaction. Available actions depend on the current status of the payment transaction.

Parameters passed to function createCheckoutPayment(params: CheckoutPaymentActionInput) => expects checkoutId and paymentAction

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `CheckoutPaymentActionInput`, `unknown`\>

'response?.createCheckoutPaymentAction' which contains payment related information

#### Defined in

[mutations/multiShip/useCreateCheckoutPaymentActionMutations/useCreateCheckoutPaymentActionMutations.tsx:44](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useCreateCheckoutPaymentActionMutations/useCreateCheckoutPaymentActionMutations.tsx#L44)
