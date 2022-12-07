import { wishlist } from '../../fragments'

const createWishlistMutation = /* GraphQL */ `
  mutation createWishlist($wishlistInput: CrWishlistInput!) {
    createWishlist(wishlistInput: $wishlistInput) {
      ...wishlist
    }
  }
  ${wishlist}
`

export default createWishlistMutation
