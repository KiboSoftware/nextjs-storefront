import { checkoutLineItemFragment } from '../../fragments'

const setMultiShipPersonalInfo = /* GraphQL */ `
  mutation updateCheckout($checkoutId: String!, $checkoutInput: CheckoutInput) {
    updateCheckout(checkoutId: $checkoutId, checkoutInput: $checkoutInput) {
      id
      email
      amountRemainingForPayment
      total
      shippingTotal
      couponCodes
      invalidCoupons {
        couponCode
        reason
      }
      orderDiscounts {
        impact
        discount {
          id
          name
        }
        couponCode
      }
      items {
        ...checkoutLineItemFragment
      }
    }
  }
  ${checkoutLineItemFragment}
`
export default setMultiShipPersonalInfo
