[next-storefront](../README.md) / useCreateOrder

# Module: useCreateOrder

## Table of contents

### Functions

- [useCreateOrder](useCreateOrder.md#usecreateorder)

## Functions

### useCreateOrder

▸ **useCreateOrder**(): `UseMutationResult`<`any`, `unknown`, `CrOrder`, `unknown`\>

[Mutation hook] useCreateOrder uses the graphQL mutation

<b>createOrderAction(orderId: String!, orderActionInput: OrderActionInput): Order</b>

Description : Creates a new order after clicking 'Confirm & Pay' button on Review step of checkout page

Parameters passed to function createOrder(checkout: Order) => expects object of type 'Order'

On success, calls invalidateQueries on checkoutKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `CrOrder`, `unknown`\>

'response?.createOrderAction' which contains Order number, payment status, product items with totals, shipping and billing details, fulfillment methods.

#### Defined in

[mutations/standardCheckout/useCreateOrder/useCreateOrder.tsx:47](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useCreateOrder/useCreateOrder.tsx#L47)
