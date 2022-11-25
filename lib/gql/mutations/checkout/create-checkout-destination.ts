import { destinationContactFragment } from '../../fragments'

const createCheckoutDestination = /* GraphQL */ `
  mutation createCheckoutDestination($checkoutId: String!, $destinationInput: DestinationInput) {
    createCheckoutDestination(checkoutId: $checkoutId, destinationInput: $destinationInput) {
      destinationContact {
        ...destinationContactFragment
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContactFragment}
`

export default createCheckoutDestination
