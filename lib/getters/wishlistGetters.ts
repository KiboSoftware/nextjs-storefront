import type { ProductCustom } from '@/lib/types'

import type { Maybe, Wishlist } from '@/lib/gql/types'
export interface InWishlistProductInput {
  productCode: string
  variationProductCode?: string
}

interface InWishlistItemInputParams {
  product: InWishlistProductInput
  currentWishlist: Maybe<Wishlist> | undefined
}

const isInWishlist = (props: InWishlistItemInputParams) => {
  const { product, currentWishlist } = props
  if (!currentWishlist) return false

  return currentWishlist?.items?.some((wishListItems) => {
    if (!wishListItems?.product?.variationProductCode) {
      return wishListItems?.product?.productCode === product?.productCode
    }
    return wishListItems?.product?.variationProductCode === product?.variationProductCode
  })
}

const isAvailableToAddToWishlist = (product: ProductCustom) => {
  if (product?.options?.some((option) => option?.isRequired))
    return Boolean(product?.purchasableState?.isPurchasable)

  return true
}

export const wishlistGetters = {
  isInWishlist,
  isAvailableToAddToWishlist,
}
