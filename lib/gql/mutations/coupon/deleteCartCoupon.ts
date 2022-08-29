import { cartDetails } from '@/lib/gql/fragments'

const deleteCartCouponMutation = /* GraphQL */ `
  ${cartDetails}

  mutation deleteCartCoupon($cartId: String!, $couponCode: String!) {
    deleteCartCoupon(cartId: $cartId, couponCode: $couponCode) {
      ...cartDetails
    }
  }
`

export default deleteCartCouponMutation
