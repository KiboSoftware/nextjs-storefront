[next-storefront](../README.md) / useAddOrderPaymentInfo

# Module: useAddOrderPaymentInfo

## Table of contents

### Functions

- [useAddOrderPaymentInfo](useAddOrderPaymentInfo.md#useaddorderpaymentinfo)

## Functions

### useAddOrderPaymentInfo

▸ **useAddOrderPaymentInfo**(): `UseMutationResult`<`any`, `unknown`, `PaymentMethodInput`, `unknown`\>

[Mutation hook] useAddOrderPaymentInfo uses the graphQL mutation

<b>createOrderPaymentAction(orderId: String!, paymentActionInput: PaymentActionInput): Order</b>

Description : Creates payment action for order at checkout

Parameters passed to function updatePaymentMethod(props: PaymentMethodInput) => expects object of type 'PaymentMethodInput' containing orderId and payment action

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `PaymentMethodInput`, `unknown`\>

'response?.createOrderPaymentAction', which contains details of payment method user used for checkout

#### Defined in

[mutations/standardCheckout/useAddOrderPaymentInfo/useAddOrderPaymentInfo.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useAddOrderPaymentInfo/useAddOrderPaymentInfo.ts#L45)
