import { cartItemDetails } from '../../fragments/cart'

const updateCartMutation = /* GraphQL */ `
  ${cartItemDetails}

  mutation updateCart($cartId: String!, $cartInput: CrCartInput) {
    updateCart(cartId: $cartId, cartInput: $cartInput) {
      data
      items {
        ...cartItemDetails
      }
    }
  }
`
export default updateCartMutation
