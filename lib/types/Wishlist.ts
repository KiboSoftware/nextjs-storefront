import type { Maybe, ProductOptionSelectionInput, CrWishlist } from '@/lib/gql/types'
export interface WishlistProductInput {
  options: ProductOptionSelectionInput[]
  productCode: string
  isPackagedStandAlone: boolean
  variationProductCode?: string
}

export interface RemoveWishlistItemInput {
  product: WishlistProductInput
  currentWishlist?: Maybe<CrWishlist>
}
export interface WishlistParams extends WishlistProductInput {
  currentWishlist?: Maybe<CrWishlist>
}
export interface WishlistItemInWishlistParams {
  productCode: string
  variationProductCode?: string
  userWishlist?: Maybe<CrWishlist>
}

export interface WishlistHookParams {
  isRemovedFromWishlist?: boolean
  delay?: number
}
