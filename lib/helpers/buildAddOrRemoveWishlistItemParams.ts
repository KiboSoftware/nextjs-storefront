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
      product?.options?.map((productOption) => {
        const selected = productOption?.values?.find((value: any) => value?.isSelected)
        return {
          attributeFQN: productOption?.attributeFQN,
          name: productOption?.attributeDetail?.name,
          value: selected?.value || selected?.stringValue || selected?.shopperEnteredValue,
        }
      }) || [],
  }
}
