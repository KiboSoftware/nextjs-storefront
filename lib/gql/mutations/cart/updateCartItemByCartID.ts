import { cartItemDetails } from '../../fragments/cart'

const updateCartItemByCartIDMutation = /* GraphQL */ `
  ${cartItemDetails}

  mutation updateCartItem($cartId: String!, $cartItemId: String!, $cartItemInput: CrCartItemInput) {
    updateCartItem(cartId: $cartId, cartItemId: $cartItemId, cartItemInput: $cartItemInput) {
      ...cartItemDetails
    }
  }
`
export default updateCartItemByCartIDMutation
