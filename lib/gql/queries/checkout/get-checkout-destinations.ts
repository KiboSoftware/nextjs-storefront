import { destinationContact } from '../../fragments/destinationContact'

const getCheckoutDestinationsQuery = /* GraphQL */ `
  query getCheckoutDestinations($checkoutId: String!) {
    checkoutDestinations(checkoutId: $checkoutId) {
      destinationContact {
        ...destinationContact
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContact}
`
export default getCheckoutDestinationsQuery
