import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
} from '../../fragments/checkout'

const getOrCreateCheckoutFromCartMutation = /* GraphQL */ `
  mutation getOrCreateCheckoutFromCart($cartId: String, $quoteId: String) {
    checkout: createOrder(cartId: $cartId, quoteId: $quoteId) {
      originalQuoteId
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

export default getOrCreateCheckoutFromCartMutation
