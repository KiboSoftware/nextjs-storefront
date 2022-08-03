import { wishlistItem } from '../../fragments'

const createWishlistItemMutation = /* GraphQL */ `
  mutation createWishlistItem($wishlistId: String!, $wishlistItemInput: WishlistItemInput) {
    createWishlistItem(wishlistId: $wishlistId, wishlistItemInput: $wishlistItemInput) {
      ...wishlistItem
    }
  }
  ${wishlistItem}
`
export default createWishlistItemMutation
