const addItemsToCurrentCartMutation = /* GraphQL */ `
  mutation addItemsToCurrentCart(
    $throwErrorOnInvalidItems: Boolean
    $cartItemInput: [CrCartItemInput]
  ) {
    addItemsToCurrentCart(
      throwErrorOnInvalidItems: $throwErrorOnInvalidItems
      cartItemInput: $cartItemInput
    )
  }
`

export default addItemsToCurrentCartMutation
