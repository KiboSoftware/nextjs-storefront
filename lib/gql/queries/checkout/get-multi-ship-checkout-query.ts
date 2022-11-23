import {
  baseMultiShipCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
} from '../../fragments/checkout'

const getMultiShipCheckoutQuery = /* GraphQL */ `
  query getMultiShipCheckout($checkoutId: String!) {
    checkout(checkoutId: $checkoutId) {
      ...baseMultiShipCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseMultiShipCheckoutFragment}
  ${checkoutLineItemFragment}
  ${checkoutPaymentFragment}
`
export default getMultiShipCheckoutQuery
