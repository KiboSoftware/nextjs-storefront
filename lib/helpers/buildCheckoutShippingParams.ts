import { DefaultId } from '../constants'

import type { Order, Contact, FulfillmentInfoInput } from '@/lib/gql/types'

export interface ShippingParams {
  orderId: string
  fulfillmentInfoInput: FulfillmentInfoInput
}

export interface CheckoutShippingParams {
  checkout: Order
  contact?: Contact
  email?: string
  shippingMethodCode?: string
  shippingMethodName?: string
}

export const buildCheckoutShippingParams = (params: CheckoutShippingParams): ShippingParams => {
  const { checkout, contact, email, shippingMethodCode, shippingMethodName } = params

  return {
    orderId: checkout.id,

    fulfillmentInfoInput: {
      fulfillmentContact: {
        ...(contact ? contact : checkout.fulfillmentInfo?.fulfillmentContact),
        email: email ? email : checkout.email,
      },

      shippingMethodCode: shippingMethodCode ? shippingMethodCode : null,

      shippingMethodName: shippingMethodName ? shippingMethodName : null,
    } as FulfillmentInfoInput,
  } as ShippingParams
}
