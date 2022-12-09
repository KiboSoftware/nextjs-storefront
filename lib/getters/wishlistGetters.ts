import type { ProductCustom } from '@/lib/types'

import type { Maybe, CrWishlist } from '@/lib/gql/types'
export interface InWishlistProductInput {
  productCode: string
  variationProductCode?: string
}

interface InWishlistItemInputParams {
  product: InWishlistProductInput
  currentWishlist: Maybe<CrWishlist> | undefined
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

const isValidateProductVariationSelected = (product: ProductCustom): boolean => {
  const requiredOptions = product?.options?.filter((option) => option?.isRequired === true)
  const selectedOptions = requiredOptions?.filter(
    (option) => option?.values?.filter((value) => value?.isSelected === true)?.length
  )

  return requiredOptions?.length === selectedOptions?.length
}

const isAvailableToAddToWishlist = (product: ProductCustom) => {
  if (!product?.options) return true

  if (product?.purchasableState?.isPurchasable) return product.purchasableState?.isPurchasable

  if (product?.options?.some((option) => option?.isRequired))
    return isValidateProductVariationSelected(product)
}

export const wishlistGetters = {
  isInWishlist,
  isAvailableToAddToWishlist,
}
