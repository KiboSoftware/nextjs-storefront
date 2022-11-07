import { destinationContact } from '../../fragments/destinationContact'

const updateCheckoutDestination = /* GraphQL */ `
  mutation updateCheckoutDestination(
    $checkoutId: String!
    $destinationId: String!
    $destinationInput: DestinationInput
  ) {
    updateCheckoutDestination(
      checkoutId: $checkoutId
      destinationId: $destinationId
      destinationInput: $destinationInput
    ) {
      destinationContact {
        ...destinationContact
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContact}
`

export default updateCheckoutDestination
