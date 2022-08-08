import type { Order, Contact, FulfillmentInfoInput } from '@/lib/gql/types'

export interface ShippingParams {
  orderId: string
  fulfillmentInfoInput: FulfillmentInfoInput
}

export interface Params {
  checkout: Order
  contact?: Contact
  email?: string
  shippingMethodCode?: string
  shippingMethodName?: string
}

export const buildCheckoutShippingParams = (params: Params): ShippingParams => {
  const { checkout, contact, email, shippingMethodCode, shippingMethodName } = params

  return {
    orderId: checkout.id,

    fulfillmentInfoInput: {
      fulfillmentContact: {
        ...(contact ? contact : checkout.fulfillmentInfo?.fulfillmentContact),
        email: email ? email : checkout.email,
      },

      shippingMethodCode: shippingMethodCode
        ? shippingMethodCode
        : checkout?.fulfillmentInfo?.shippingMethodCode,

      shippingMethodName: shippingMethodName
        ? shippingMethodName
        : checkout?.fulfillmentInfo?.shippingMethodName,
    } as FulfillmentInfoInput,
  } as ShippingParams
}
