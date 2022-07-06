import { CartItemInput } from '../gql/types'
import { AddToCartProductInput } from '@/hooks/mutations/useCartMutation/useCartMutation'

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
