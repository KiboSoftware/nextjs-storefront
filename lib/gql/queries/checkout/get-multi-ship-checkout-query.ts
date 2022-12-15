import {
  checkoutLineItemFragment,
  destinationContactFragment,
  checkoutGroupingsFragment,
  baseMultiShipCheckoutFragment,
} from '../../fragments'

const getMultiShipCheckoutQuery = /* GraphQL */ `
  query getMultiShipCheckout($checkoutId: String!) {
    checkout(checkoutId: $checkoutId) {
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
  ${checkoutGroupingsFragment}
  ${baseMultiShipCheckoutFragment}
`
export default getMultiShipCheckoutQuery
