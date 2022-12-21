[next-storefront](../README.md) / useUpdateCheckoutShippingInfoMutation

# Module: useUpdateCheckoutShippingInfoMutation

## Table of contents

### Functions

- [useUpdateCheckoutShippingInfoMutation](useUpdateCheckoutShippingInfoMutation.md#useupdatecheckoutshippinginfomutation)

## Functions

### useUpdateCheckoutShippingInfoMutation

▸ **useUpdateCheckoutShippingInfoMutation**(): `UseMutationResult`<`any`, `unknown`, `CheckoutShippingParams`, `unknown`\>

[Mutation hook] useUpdateCheckoutShippingInfoMutation uses the graphQL mutation

<b>updateOrderFulfillmentInfo(orderId: String!, updateMode: String, version: String, fulfillmentInfoInput: FulfillmentInfoInput): FulfillmentInfo</b>

Description : Updates user shipping(fulfillment) info at checkout

Parameters passed to function updateShippingInfo(params: CheckoutShippingParams) => expects object of type ' ShippingInfo' containing orderId and fulfillmentInfoInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `CheckoutShippingParams`, `unknown`\>

'response?.updateOrderBillingInfo', which contains updated shipping checkout information

#### Defined in

[mutations/useUpdateCheckoutMutations/useUpdateCheckoutShippingInfo/useUpdateCheckoutShippingInfoMutation.ts:51](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useUpdateCheckoutMutations/useUpdateCheckoutShippingInfo/useUpdateCheckoutShippingInfoMutation.ts#L51)
