const deleteOrderCouponMutation = /* GraphQL */ `
  mutation deleteOrderCoupon($orderId: String!, $couponCode: String!) {
    deleteOrderCoupon(orderId: $orderId, couponCode: $couponCode) {
      orderNumber
    }
  }
`

export default deleteOrderCouponMutation
