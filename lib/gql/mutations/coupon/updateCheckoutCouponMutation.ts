import { checkoutLineItemFragment } from '@/lib/gql/fragments'

const updateCheckoutCouponMutation = /* GraphQL */ `
  mutation updateCheckoutCoupon($checkoutId: String!, $couponCode: String!) {
    updateCheckoutCoupon(checkoutId: $checkoutId, couponCode: $couponCode) {
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

export default updateCheckoutCouponMutation
