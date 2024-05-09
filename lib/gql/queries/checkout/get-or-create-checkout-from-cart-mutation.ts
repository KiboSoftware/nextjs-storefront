import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
} from '../../fragments/checkout'

const getOrCreateCheckoutFromCartMutation = /* GraphQL */ `
  mutation getOrCreateCheckoutFromCart(
    $cartId: String
    $quoteId: String
    $orderInput: CrOrderInput
  ) {
    checkout: createOrder(cartId: $cartId, quoteId: $quoteId, orderInput: $orderInput) {
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

export default getOrCreateCheckoutFromCartMutation
