import type { CrOrder, CrContact, CrFulfillmentInfoInput } from '@/lib/gql/types'

export interface ShippingParams {
  orderId: string
  fulfillmentInfoInput: CrFulfillmentInfoInput
}

export interface CheckoutShippingParams {
  checkout: CrOrder
  contact?: CrContact
  email?: string
  shippingMethodCode?: string
  shippingMethodName?: string
  data?: any
}

export const buildCheckoutShippingParams = (params: CheckoutShippingParams): ShippingParams => {
  const { checkout, contact, email, shippingMethodCode, shippingMethodName, data } = params

  return {
    orderId: checkout.id,

    fulfillmentInfoInput: {
      data,
      fulfillmentContact: {
        ...(contact ? contact : checkout.fulfillmentInfo?.fulfillmentContact),
        email: email ? email : checkout.email,
      },

      shippingMethodCode: shippingMethodCode ? shippingMethodCode : null,

      shippingMethodName: shippingMethodName ? shippingMethodName : null,
    } as CrFulfillmentInfoInput,
  } as ShippingParams
}
