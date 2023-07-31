export const updateWishlistItemQuantityMutation = /* GraphQL */ `
  mutation updateWishlistItemQuantity(
    $wishlistId: String!
    $wishlistItemId: String!
    $quantity: Int!
  ) {
    updateWishlistItemQuantity(
      wishlistId: $wishlistId
      wishlistItemId: $wishlistItemId
      quantity: $quantity
    ) {
      id
    }
  }
`
export default updateWishlistItemQuantityMutation
