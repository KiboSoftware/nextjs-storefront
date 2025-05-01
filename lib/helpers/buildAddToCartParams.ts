import { FulfillmentOptions } from '../constants'
import { AddToCartProductInput } from '@/hooks'

import type { CrCartItemInput, CrSubscriptionInfo } from '../gql/types'

export const buildAddToCartParams = (
  product: AddToCartProductInput,
  quantity: number,
  subscription?: CrSubscriptionInfo
): CrCartItemInput => {
  return {
    product: {
      options: product?.options,
      productCode: product?.productCode || '',
      variationProductCode: product?.variationProductCode || '',
    },
    quantity,
    fulfillmentMethod: product?.fulfillmentMethod,
    ...(product.fulfillmentMethod === FulfillmentOptions.PICKUP && {
      fulfillmentLocationCode: product?.purchaseLocationCode,
    }),
    subscription,
  }
}
