export const deleteWishListItemMutation = /* GraphQL */ `
  mutation deletewishlistitem($wishlistId: String!, $wishlistItemId: String!) {
    deleteWishlistItem(wishlistId: $wishlistId, wishlistItemId: $wishlistItemId)
  }
`
export default deleteWishListItemMutation
