import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
  checkoutPaymentFragment,
} from '../../fragments/checkout'

const getCheckoutQuery = /* GraphQL */ `
  query getCheckout($checkoutId: String!) {
    checkout: order(orderId: $checkoutId) {
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      fulfillmentInfo {
        ...fullfillmentInfoFragment
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${fullfillmentInfoFragment}
  ${checkoutPaymentFragment}
`
export default getCheckoutQuery
