import { Maybe, ProductOption, Wishlist } from '@/lib/gql/types'

export interface WishlistProductInput {
  options: ProductOption[]
  productCode: string
  isPackagedStandAlone: boolean
  variationProductCode?: string
}

export interface RemoveWishlistItemInput {
  product: WishlistProductInput
  currentWishlist?: Maybe<Wishlist>
}
export interface WishlistParams extends WishlistProductInput {
  currentWishlist?: Maybe<Wishlist>
}
export interface WishlistItemInWishlistParams {
  productCode: string
  variationProductCode?: string
  userWishlist?: Maybe<Wishlist>
}

export interface WishlistHookParams {
  isRemovedFromWishlist?: boolean
  delay?: number
}
