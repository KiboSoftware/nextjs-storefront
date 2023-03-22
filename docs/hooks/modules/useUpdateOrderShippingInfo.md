[next-storefront](../README.md) / useUpdateOrderShippingInfo

# Module: useUpdateOrderShippingInfo

## Table of contents

### Functions

- [useUpdateOrderShippingInfo](useUpdateOrderShippingInfo.md#useupdateordershippinginfo)

## Functions

### useUpdateOrderShippingInfo

▸ **useUpdateOrderShippingInfo**(): `UseMutationResult`<`any`, `unknown`, `CheckoutShippingParams`, `unknown`\>

[Mutation hook] useUpdateOrderShippingInfo uses the graphQL mutation

<b>updateOrderFulfillmentInfo(orderId: String!, updateMode: String, version: String, fulfillmentInfoInput: FulfillmentInfoInput): FulfillmentInfo</b>

Description : Updates user shipping(fulfillment) info at checkout

Parameters passed to function updateShippingInfo(params: CheckoutShippingParams) => expects object of type ' ShippingInfo' containing  orderId and fulfillmentInfoInput

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `CheckoutShippingParams`, `unknown`\>

'response?.updateOrderBillingInfo', which contains updated shipping checkout information

#### Defined in

[mutations/standardCheckout/useUpdateOrderShippingInfo/useUpdateCheckoutShippingInfoMutation.ts:51](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useUpdateOrderShippingInfo/useUpdateCheckoutShippingInfoMutation.ts#L51)
