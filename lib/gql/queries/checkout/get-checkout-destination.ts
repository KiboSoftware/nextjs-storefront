import { destinationContact } from '../../fragments/destinationContact'

const getCheckoutDestinationQuery = /* GraphQL */ `
  query getCheckoutDestination($checkoutId: String!, $destinationId: String!) {
    checkoutDestination(orderId: $checkoutId, destinationId: $destinationId) {
      destinationContact {
        ...destinationContact
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContact}
`
export default getCheckoutDestinationQuery
