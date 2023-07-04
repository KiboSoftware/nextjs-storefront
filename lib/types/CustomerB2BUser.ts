import type { Maybe, ProductOptionSelectionInput, CrWishlist } from '@/lib/gql/types'
export interface B2BUserInput {
  firstName: string
  lastName: string
  emailAddress: string
  userName: string
  localeCode?: string
}

// export interface DeleteWishlistItemInput {
//     product: WishlistProductInput
//     currentWishlist?: Maybe<CrWishlist>
// }
// export interface WishlistParams extends WishlistProductInput {
//     currentWishlist?: Maybe<CrWishlist>
// }
// export interface WishlistItemInWishlistParams {
//     productCode: string
//     variationProductCode?: string
//     userWishlist?: Maybe<CrWishlist>
// }

export interface CustomerB2BUserParams {
  removeCustomerB2bAccountUser?: boolean
  delay?: number
}

export interface CustomerB2BUserRole {
  roleName: string
  roleId: number
}
