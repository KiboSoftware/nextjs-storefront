import { wishlistItem } from '../../fragments'

const createWishlistItemMutation = /* GraphQL */ `
  mutation createWishlistItem($wishlistId: String!, $wishlistItemInput: CrWishlistItemInput) {
    createWishlistItem(wishlistId: $wishlistId, wishlistItemInput: $wishlistItemInput) {
      ...wishlistItem
    }
  }
  ${wishlistItem}
`
export default createWishlistItemMutation
