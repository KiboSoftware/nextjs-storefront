import { CartItemInput } from '../gql/types'
import { ProductCustom } from '../types'

export const buildAddToCartInput = (product: ProductCustom, quantity: number): CartItemInput => {
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
