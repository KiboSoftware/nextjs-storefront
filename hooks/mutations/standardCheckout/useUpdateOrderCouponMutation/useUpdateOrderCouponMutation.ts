/**
 * @module useUpdateOrderCouponMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateOrderCouponMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

interface UpdateOrderCouponParams {
  checkoutId: string
  couponCode: string
}

const updateOrderCoupon = async (params: UpdateOrderCouponParams) => {
  const client = makeGraphQLClient()
  const { checkoutId, couponCode } = params

  const variables = {
    orderId: checkoutId,
    couponCode,
  }

  const response = await client.request({
    document: updateOrderCouponMutation,
    variables,
  })

  return response?.updateOrderCoupon
}

/**
 * [Mutation hook] useUpdateOrderCouponMutation uses the graphQL mutation
 *
 * <b>updateOrderCoupon(orderId: String!, couponCode: String!, updateMode: String, version: String): Order</b>
 *
 * Description : Applies promo code in Order Summary of checkout pages
 *
 * Parameters passed to function updateOrderCoupon(params: UpdateOrderCouponParams) => expects object of type 'UpdateOrderCouponParams' containing checkoutId and couponCode
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.updateOrderCoupon' which applies the coupon on checkout page((if coupon is valid))
 */
export const useUpdateOrderCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(updateOrderCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
