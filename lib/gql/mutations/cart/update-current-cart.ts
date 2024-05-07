import { cartItemDetails } from '../../fragments/cart'

const updateCurrentCartMutation = /* GraphQL */ `
  ${cartItemDetails}

  mutation updateCurrentCartMutation($cartInput: CrCartInput) {
    updateCurrentCart(cartInput: $cartInput) {
      items {
        ...cartItemDetails
      }
    }
  }
`
export default updateCurrentCartMutation
