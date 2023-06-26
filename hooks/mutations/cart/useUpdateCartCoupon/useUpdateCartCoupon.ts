/**
 * @module useUpdateCartCoupon
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartCouponMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

interface UpdateCartCouponParams {
  cartId: string
  couponCode: string
}

const updateCartCoupon = async (params: UpdateCartCouponParams) => {
  const client = makeGraphQLClient()
  const { cartId, couponCode } = params

  const variables = {
    cartId,
    couponCode,
  }
  const response = await client.request({
    document: updateCartCouponMutation,
    variables,
  })

  return response?.updateCartCoupon
}

/**
 * [Mutation hook] useUpdateCartCoupon uses the graphQL mutation
 *
 * <b>updateCartCoupon(cartId: String!, couponCode: String!): Cart</b>
 *
 * Description : Applies promo code in Order Summary of cart page
 *
 * Parameters passed to function updateCartCoupon(params: UpdateCartCouponParams) => expects object of type 'UpdateCartCouponParams' containing cartId and couponCode
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.updateCartCoupon' which applies the coupon on cart page(if coupon is valid)
 */
export const useUpdateCartCoupon = () => {
  const queryClient = useQueryClient()
  return {
    updateCartCoupon: useMutation({
      mutationFn: updateCartCoupon,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: cartKeys.all })
      },
    }),
  }
}
