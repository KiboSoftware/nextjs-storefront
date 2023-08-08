import { auditInfoFragment } from '../../fragments'
import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
  checkoutPaymentFragment,
} from '../../fragments/checkout'

const getCheckoutQuery = /* GraphQL */ `
  query getCheckout($checkoutId: String!) {
    checkout: order(orderId: $checkoutId) {
      siteId
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
      auditInfo {
        ...auditInfoFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${fullfillmentInfoFragment}
  ${checkoutPaymentFragment}
  ${auditInfoFragment}
`
export default getCheckoutQuery
