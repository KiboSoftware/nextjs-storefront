[next-storefront](../README.md) / useVoidOrderPayment

# Module: useVoidOrderPayment

## Table of contents

### Functions

- [useVoidOrderPayment](useVoidOrderPayment.md#usevoidorderpayment)

## Functions

### useVoidOrderPayment

▸ **useVoidOrderPayment**(): `UseMutationResult`<`any`, `unknown`, `UpdateOrderPaymentActionParams`, `unknown`\>

[Mutation hook] useVoidOrderPayment uses the graphQL mutation

<b>createOrderPaymentPaymentAction(orderId: String!, paymentId: String!, paymentActionInput: PaymentActionInput): Order</b>

Description : Updates user payment action for order at checkout

Parameters passed to function updateOrderPaymentActionMutation(params: UpdateOrderPaymentActionParams) => expects object of type ' UpdateOrderPaymentActionParams' containing orderId, paymentId,paymentAction

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateOrderPaymentActionParams`, `unknown`\>

'response?.updateOrderBillingInfo', which contains updated payment information at checkout

#### Defined in

[mutations/standardCheckout/useVoidOrderPayment/useVoidOrderPayment.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useVoidOrderPayment/useVoidOrderPayment.ts#L46)
