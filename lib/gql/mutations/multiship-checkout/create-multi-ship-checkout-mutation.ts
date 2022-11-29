import {
  contactForOrdersFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
  multiShipCheckoutGroupingFragment,
  baseMultiShipCheckoutFragment,
} from '@/lib/gql/fragments'

const createCheckoutMutation = /* GraphQL */ `
  mutation createCheckout($cartId: String) {
    createCheckout(cartId: $cartId) {
      ...baseMultiShipCheckoutFragment
      items {
        destinationId
        ...checkoutLineItemFragment
      }
      groupings {
        ...multiShipCheckoutGroupingFragment
      }
      destinations {
        id
        destinationContact {
          ...contactForOrdersFragment
        }
        isDestinationCommercial
        data
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseMultiShipCheckoutFragment}
  ${checkoutLineItemFragment}
  ${multiShipCheckoutGroupingFragment}
  ${checkoutPaymentFragment}
  ${contactForOrdersFragment}
`

export default createCheckoutMutation
