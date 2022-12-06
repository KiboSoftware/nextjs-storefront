import { destinationContactFragment } from '../../fragments'

const getCheckoutDestinationQuery = /* GraphQL */ `
  query getCheckoutDestination($checkoutId: String!, $destinationId: String!) {
    checkoutDestination(orderId: $checkoutId, destinationId: $destinationId) {
      destinationContact {
        ...destinationContactFragment
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContactFragment}
`
export default getCheckoutDestinationQuery
