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
    fulfillmentLocationCode: product?.purchaseLocationCode,
    subscription,
  }
}
