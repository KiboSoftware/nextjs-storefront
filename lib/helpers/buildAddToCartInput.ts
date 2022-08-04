import { AddToCartProductInput } from '@/hooks'

import type { CartItemInput } from '../gql/types'

export const buildAddToCartInput = (
  product: AddToCartProductInput,
  quantity: number
): CartItemInput => {
  return {
    product: {
      options: product?.options,
      productCode: product?.productCode || '',
      variationProductCode: product?.variationProductCode || '',
    },
    quantity,
    fulfillmentMethod: product?.fulfillmentMethod,
    purchaseLocation: product?.purchaseLocationCode,
  }
}
