const deleteCartItemMutation = /* GraphQL */ `
  mutation deleteCartItem($itemId: String!) {
    deleteCurrentCartItem(cartItemId: $itemId)
  }
`

export default deleteCartItemMutation
