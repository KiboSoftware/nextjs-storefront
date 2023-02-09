import {
  checkoutLineItemFragment,
  destinationContactFragment,
  checkoutGroupingsFragment,
  baseMultiShipCheckoutFragment,
  checkoutPaymentFragment,
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
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${checkoutLineItemFragment}
  ${destinationContactFragment}
  ${checkoutGroupingsFragment}
  ${baseMultiShipCheckoutFragment}
  ${checkoutPaymentFragment}
`
export default getMultiShipCheckoutQuery
