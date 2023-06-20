import {
  checkoutLineItemFragment,
  destinationContactFragment,
  checkoutGroupingsFragment,
  baseMultiShipCheckoutFragment,
  checkoutPaymentFragment,
  auditInfoFragment,
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
      auditInfo {
        ...auditInfoFragment
      }
    }
  }
  ${checkoutLineItemFragment}
  ${destinationContactFragment}
  ${checkoutGroupingsFragment}
  ${baseMultiShipCheckoutFragment}
  ${checkoutPaymentFragment}
  ${auditInfoFragment}
`
export default getMultiShipCheckoutQuery
