import { productGetters } from '../getters'

import type { ProductCustom, WishlistProductInput } from '../types'

export const buildAddOrRemoveWishlistItemParams = (
  product: ProductCustom
): WishlistProductInput => {
  const { productCode, variationProductCode, isPackagedStandAlone } =
    productGetters.getProductDetails(product)

  return {
    productCode,
    variationProductCode,
    isPackagedStandAlone,
    options:
      product?.options?.map((productOption) => ({
        attributeFQN: productOption?.attributeFQN,
        name: productOption?.attributeDetail?.name,
        value: productOption?.values?.find((v) => v?.isSelected)?.value,
      })) || [],
  }
}
