import { FulfillmentOptions } from '../constants'

import type { CrCartItemInput, CrWishlistItem } from '../gql/types'

export const buildAddItemsToCartParams = (items: CrWishlistItem[]): CrCartItemInput[] => {
  const wishlistItemsProducts = [] as CrCartItemInput[]
  items.forEach((item) => {
    const product = item.product
    const quantity = item.quantity
    wishlistItemsProducts.push({
      product: {
        options: product?.options,
        productCode: product?.productCode ?? '',
        variationProductCode: product?.variationProductCode ?? '',
      },
      quantity,
      fulfillmentMethod: FulfillmentOptions.SHIP,
    })
  })
  return wishlistItemsProducts
}
