import {
  baseMultiShipCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
  destinationContactFragment,
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
          ...destinationContactFragment
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
  ${destinationContactFragment}
`
export default getMultiShipCheckoutQuery
