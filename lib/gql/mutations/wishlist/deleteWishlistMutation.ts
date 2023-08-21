export const deleteWishListItemMutation = /* GraphQL */ `
  mutation deletewishlist($wishlistId: String!) {
    deleteWishlist(wishlistId: $wishlistId)
  }
`
export default deleteWishListItemMutation
