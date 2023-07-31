import { wishlist } from '../../fragments'
export const updateWishlistMutation = /* GraphQL */ `
  mutation updateWishlist($wishlistId: String!, $wishlistInput: CrWishlistInput) {
    updateWishlist(wishlistId: $wishlistId, wishlistInput: $wishlistInput) {
      ...wishlist
    }
  }
  ${wishlist}
`
export default updateWishlistMutation
