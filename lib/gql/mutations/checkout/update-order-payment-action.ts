import {
  baseCheckoutFragment,
  checkoutLineItemFragment,
  fullfillmentInfoFragment,
  checkoutPaymentFragment,
} from '../../fragments'

const updateOrderPaymentAction = /* GraphQL */ `
  mutation createOrderPaymentPaymentAction(
    $orderId: String!
    $paymentId: String!
    $paymentAction: PaymentActionInput
  ) {
    createOrderPaymentPaymentAction(
      orderId: $orderId
      paymentId: $paymentId
      paymentActionInput: $paymentAction
    ) {
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

export default updateOrderPaymentAction
