import { destinationContactFragment } from '../../fragments'

const updateCheckoutDestination = /* GraphQL */ `
  mutation updateCheckoutDestination(
    $checkoutId: String!
    $destinationId: String!
    $destinationInput: CrDestinationInput
  ) {
    updateCheckoutDestination(
      checkoutId: $checkoutId
      destinationId: $destinationId
      destinationInput: $destinationInput
    ) {
      destinationContact {
        ...destinationContactFragment
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContactFragment}
`

export default updateCheckoutDestination
