import { wishlist } from '../../fragments'

const createWishlistMutation = /* GraphQL */ `
  mutation createWishlist($wishlistInput: WishlistInput!) {
    createWishlist(wishlistInput: $wishlistInput) {
      ...wishlist
    }
  }
  ${wishlist}
`

export default createWishlistMutation
