import { WishlistParams } from '../types'

export const buildWishlistParams = (params: WishlistParams) => {
  const { productCode, variationProductCode, isPackagedStandAlone, options, currentWishlist } =
    params

  return {
    product: {
      productCode,
      isPackagedStandAlone,
      variationProductCode,
      options,
    },
    currentWishlist,
  }
}
