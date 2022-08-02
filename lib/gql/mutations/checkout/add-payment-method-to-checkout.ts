import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  checkoutPaymentFragment,
  fullfillmentInfoFragment,
} from '../../fragments'

const addPaymentMethodToCheckout = /* GraphQL */ `
  mutation addPaymentMethod($orderId: String!, $paymentAction: PaymentActionInput) {
    createOrderPaymentAction(orderId: $orderId, paymentActionInput: $paymentAction) {
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
export default addPaymentMethodToCheckout
