export interface BuildUpdateShippingAndSuggestionsParams {
  orderId: string
  orderItemId: string
  shippingMethodCode?: string
  shippingMethodName?: string
}

export const buildUpdateShippingAndSuggestionsParams = (
  params: BuildUpdateShippingAndSuggestionsParams
) => {
  const { orderId, orderItemId, shippingMethodCode, shippingMethodName } = params

  return {
    orderId,
    orderItemId,
    itemFulfillmentInfoInput: {
      shippingMethodCode: shippingMethodCode ? shippingMethodCode : null,
      shippingMethodName: shippingMethodName ? shippingMethodName : null,
    },
  }
}
