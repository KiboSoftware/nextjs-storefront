import {
  checkoutLineItemFragment,
  destinationContactFragment,
  baseMultiShipCheckoutFragment,
  checkoutGroupingsFragment,
} from '../../fragments'
const updateCheckoutItemDestination = /* GraphQL */ `
  mutation updateCheckoutItemDestination(
    $checkoutId: String!
    $itemId: String!
    $destinationId: String!
  ) {
    updateCheckoutItemDestination(
      checkoutId: $checkoutId
      itemId: $itemId
      destinationId: $destinationId
    ) {
      ...baseMultiShipCheckoutFragment
      couponCodes
      items {
        destinationId
        ...checkoutLineItemFragment
      }
      destinations {
        id
        destinationContact {
          ...destinationContactFragment
        }
      }
      groupings {
        ...checkoutGroupingsFragment
      }
    }
  }
  ${checkoutLineItemFragment}
  ${destinationContactFragment}
  ${baseMultiShipCheckoutFragment}
  ${checkoutGroupingsFragment}
`

export default updateCheckoutItemDestination
