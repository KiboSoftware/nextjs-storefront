[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateOrderPaymentAction

# Module: mutation_useUpdateOrderPaymentAction

## Table of contents

### Functions

- [useUpdateOrderPaymentActionMutation](mutation_useUpdateOrderPaymentAction.md#useupdateorderpaymentactionmutation)

## Functions

### useUpdateOrderPaymentActionMutation

▸ **useUpdateOrderPaymentActionMutation**(): `UseMutationResult`<`any`, `unknown`, `UpdateOrderPaymentActionParams`, `unknown`\>

[Mutation hook] useUpdateOrderPaymentActionMutation uses the graphQL mutation

<b>createOrderPaymentPaymentAction(orderId: String!, paymentId: String!, paymentActionInput: PaymentActionInput): Order</b>

Description : Updates user payment action for order at checkout

Parameters passed to function updateOrderPaymentActionMutation(params: UpdateOrderPaymentActionParams) => expects object of type ' UpdateOrderPaymentActionParams' containing orderId, paymentId,paymentAction

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateOrderPaymentActionParams`, `unknown`\>

'response?.updateOrderBillingInfo', which contains updated payment information at checkout

#### Defined in

[mutations/useUpdateCheckoutMutations/useUpdateOrderPaymentActionMutation/useUpdateOrderPaymentActionMutation.ts:46](https://github.com/KiboSoftware/nextjs-storefront/blob/a6cbcc7/hooks/mutations/useUpdateCheckoutMutations/useUpdateOrderPaymentActionMutation/useUpdateOrderPaymentActionMutation.ts#L46)
