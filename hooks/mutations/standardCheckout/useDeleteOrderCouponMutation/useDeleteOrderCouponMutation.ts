/**
 * @module useDeleteOrderCouponMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteOrderCouponMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

interface DeleteCartCouponParams {
  checkoutId: string
  couponCode: string
}

const deleteOrderCoupon = async (params: DeleteCartCouponParams) => {
  const client = makeGraphQLClient()
  const { checkoutId, couponCode } = params

  const variables = {
    orderId: checkoutId,
    couponCode,
  }
  const response = await client.request({
    document: deleteOrderCouponMutation,
    variables,
  })

  return response?.deleteOrderCoupon
}

/**
 * [Mutation hook] useDeleteOrderCouponMutation uses the graphQL mutation
 *
 * <b>deleteOrderCoupons(orderId: String!, updateMode: String, version: String): Order</b>
 *
 * Description : Removes promo code from Order Summary in checkout pages
 *
 * Parameters passed to function deleteOrderCoupon(params: DeleteCartCouponParams) => expects object of type 'DeleteCartCouponParams' containing checkoutId and couponCode
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated
 *
 * @returns 'response?.deleteOrderCoupon' which removes the applied coupon on checkout page
 */
export const useDeleteOrderCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteOrderCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
