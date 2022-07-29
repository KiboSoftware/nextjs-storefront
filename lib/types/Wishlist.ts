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

export interface WishlistParams {
  productCode: string
  variationProductCode: string
  isPackagedStandAlone: boolean
  options: ProductOption[]
  currentWishlist?: Maybe<Wishlist>
}
