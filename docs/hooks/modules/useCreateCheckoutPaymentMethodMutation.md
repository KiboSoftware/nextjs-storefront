[next-storefront](../README.md) / useCreateCheckoutPaymentMethodMutation

# Module: useCreateCheckoutPaymentMethodMutation

## Table of contents

### Functions

- [useCreateCheckoutPaymentMethodMutation](useCreateCheckoutPaymentMethodMutation.md#usecreatecheckoutpaymentmethodmutation)

## Functions

### useCreateCheckoutPaymentMethodMutation

▸ **useCreateCheckoutPaymentMethodMutation**(): `UseMutationResult`<`any`, `unknown`, `PaymentMethodInput`, `unknown`\>

[Mutation hook] useCreateCheckoutPaymentMethodMutation uses the graphQL mutation

<b>createOrderPaymentAction(orderId: String!, paymentActionInput: PaymentActionInput): Order</b>

Description : Creates payment action for order at checkout

Parameters passed to function updatePaymentMethod(props: PaymentMethodInput) => expects object of type 'PaymentMethodInput' containing orderId and payment action

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `PaymentMethodInput`, `unknown`\>

'response?.createOrderPaymentAction', which contains details of payment method user used for checkout

#### Defined in

[mutations/useUpdateCheckoutMutations/useCreateCheckoutPaymentMethod/useCreateCheckoutPaymentMethodMutation.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useUpdateCheckoutMutations/useCreateCheckoutPaymentMethod/useCreateCheckoutPaymentMethodMutation.ts#L45)
