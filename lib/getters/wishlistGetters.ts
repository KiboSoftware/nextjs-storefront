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

  const items = currentWishlist?.items?.some((wishListItems) => {
    if (!wishListItems?.product?.variationProductCode) {
      return wishListItems?.product?.productCode === product?.productCode
    }
    return wishListItems?.product?.variationProductCode === product?.variationProductCode
  })
  return items
}

export const wishlistGetters = {
  isInWishlist,
}
