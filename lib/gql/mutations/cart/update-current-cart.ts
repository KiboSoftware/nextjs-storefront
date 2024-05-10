import { cartItemDetails } from '../../fragments/cart'

const updateCurrentCartMutation = /* GraphQL */ `
  ${cartItemDetails}

  mutation updateCurrentCartMutation($cartInput: CrCartInput) {
    updateCurrentCart(cartInput: $cartInput) {
      data
      items {
        ...cartItemDetails
      }
    }
  }
`
export default updateCurrentCartMutation
