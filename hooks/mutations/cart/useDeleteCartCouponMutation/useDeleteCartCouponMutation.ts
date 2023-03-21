/**
 * @module useDeleteCartCouponMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteCartCouponMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

interface DeleteCartCouponParams {
  cartId: string
  couponCode: string
}

const deleteCartCoupon = async (params: DeleteCartCouponParams) => {
  const client = makeGraphQLClient()
  const { cartId, couponCode } = params

  const variables = {
    cartId,
    couponCode,
  }
  const response = await client.request({
    document: deleteCartCouponMutation,
    variables,
  })

  return response?.deleteCartCoupon
}

/**
 * [Mutation hook] useDeleteCartCouponMutation uses the graphQL mutation
 *
 * <b>deleteCartCoupon(cartId: String!, couponCode: String!): Cart</b>
 *
 * Description : Removes promo code from Order Summary in cart page
 *
 * Parameters passed to function deleteCartCoupon(params: DeleteCartCouponParams) => expects object of type 'DeleteCartCouponParams' containing cartId and couponCode
 *
 * On success, calls invalidateQueries on cartKeys and fetches the updated result
 *
 * @returns 'response?.deleteCartCoupon' which removes the applied coupon on cart page
 */
export const useDeleteCartCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteCartCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.all)
    },
  })
}
