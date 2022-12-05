import {
  checkoutLineItemFragment,
  destinationContactFragment,
  baseMultiShipCheckoutFragment,
  checkoutGroupingsFragment,
} from '../../fragments'

const setMultiShipPersonalInfo = /* GraphQL */ `
  mutation updateCheckout($checkoutId: String!, $checkoutInput: CheckoutInput) {
    checkout: updateCheckout(checkoutId: $checkoutId, checkoutInput: $checkoutInput) {
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
export default setMultiShipPersonalInfo
