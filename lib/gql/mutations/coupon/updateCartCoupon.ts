import { cartDetails } from '@/lib/gql/fragments'

const updateCartCouponMutation = /* GraphQL */ `
  ${cartDetails}

  mutation updateCartCoupon($cartId: String!, $couponCode: String!) {
    updateCartCoupon(cartId: $cartId, couponCode: $couponCode) {
      ...cartDetails
    }
  }
`

export default updateCartCouponMutation
