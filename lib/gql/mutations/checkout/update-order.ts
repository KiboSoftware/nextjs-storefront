import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
} from '../../fragments'

const updateOrderMutation = /* GraphQL */ `
  mutation updateOrder($orderId: String!, $orderInput: CrOrderInput) {
    updateOrder(orderId: $orderId, orderInput: $orderInput) {
      originalQuoteId
      data
      originalQuoteNumber
      ...baseCheckoutFragment
      items {
        ...checkoutLineItemFragment
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseCheckoutFragment}
  ${checkoutLineItemFragment}
  ${checkoutPaymentFragment}
`
export default updateOrderMutation
