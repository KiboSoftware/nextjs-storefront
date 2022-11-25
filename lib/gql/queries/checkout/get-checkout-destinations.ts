import { destinationContactFragment } from '../../fragments'

const getCheckoutDestinationsQuery = /* GraphQL */ `
  query getCheckoutDestinations($checkoutId: String!) {
    checkoutDestinations(checkoutId: $checkoutId) {
      destinationContact {
        ...destinationContactFragment
      }
      id
      isDestinationCommercial
    }
  }
  ${destinationContactFragment}
`
export default getCheckoutDestinationsQuery
