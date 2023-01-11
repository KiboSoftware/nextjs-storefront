const deleteCheckoutCouponMutation = /* GraphQL */ `
  mutation deleteCheckoutCoupon($checkoutId: String!, $couponCode: String!) {
    deleteCheckoutCoupon(checkoutId: $checkoutId, couponCode: $couponCode) {
      id
    }
  }
`

export default deleteCheckoutCouponMutation
