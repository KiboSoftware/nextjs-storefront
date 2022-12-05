import {
  baseMultiShipCheckoutFragment,
  checkoutLineItemFragment,
  destinationContactFragment,
  checkoutGroupingsFragment,
  checkoutPaymentFragment,
} from '@/lib/gql/fragments'

const updateCheckoutCouponMutation = /* GraphQL */ `
  mutation updateCheckoutCoupon($checkoutId: String!, $couponCode: String!) {
    updateCheckoutCoupon(checkoutId: $checkoutId, couponCode: $couponCode) {
      ...baseMultiShipCheckoutFragment
      couponCodes
      items {
        destinationId
        ...checkoutLineItemFragment
      }
      destinations {
        id
        destinationContact {
          ...destinationContactFragment
        }
      }
      groupings {
        ...checkoutGroupingsFragment
      }
      payments {
        ...checkoutPaymentFragment
      }
    }
  }
  ${baseMultiShipCheckoutFragment}
  ${checkoutLineItemFragment}
  ${destinationContactFragment}
  ${checkoutGroupingsFragment}
  ${checkoutPaymentFragment}
`

export default updateCheckoutCouponMutation
