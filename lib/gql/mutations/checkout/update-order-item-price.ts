import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
} from '../../fragments'

const updateOrderItemPriceMutation = /* GraphQL */ `
  mutation updateOrderItemPrice($orderId: String!, $orderItemId: String!, $price: Float!) {
    updateOrderItemPrice(orderId: $orderId, orderItemId: $orderItemId, price: $price) {
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
export default updateOrderItemPriceMutation
