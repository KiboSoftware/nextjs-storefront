import { destinationContact } from '../../fragments/destinationContact'

const createCheckoutDestination = /* GraphQL */ `
  mutation createCheckoutDestination($checkoutId: String!, $destinationInput: DestinationInput) {
    createCheckoutDestination(checkoutId: $checkoutId, destinationInput: $destinationInput) {
      destinationContact {
        ...destinationContact
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContact}
`

export default createCheckoutDestination
