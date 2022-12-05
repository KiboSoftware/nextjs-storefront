import {
  baseMultiShipCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
  contactForOrdersFragment,
  multiShipCheckoutGroupingFragment,
} from '@/lib/gql/fragments'

const getMultiShipCheckoutQuery = /* GraphQL */ `
  query getMultiShipCheckout($checkoutId: String!) {
    checkout(checkoutId: $checkoutId) {
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
  ${multiShipCheckoutGroupingFragment}
  ${checkoutLineItemFragment}
  ${checkoutPaymentFragment}
  ${contactForOrdersFragment}
`
export default getMultiShipCheckoutQuery
