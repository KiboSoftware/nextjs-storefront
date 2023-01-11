import {
  checkoutLineItemFragment,
  destinationContactFragment,
  baseMultiShipCheckoutFragment,
  checkoutGroupingsFragment,
} from '../../fragments'

const createMultiShipCheckoutFromCartMutation = /* GraphQL */ `
  mutation createCheckout($cartId: String!) {
    checkout: createCheckout(cartId: $cartId) {
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
export default createMultiShipCheckoutFromCartMutation
