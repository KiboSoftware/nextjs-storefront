/**
 * @module useDeleteCheckoutCouponMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteCheckoutCouponMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

interface DeleteCheckoutCouponParams {
  checkoutId: string
  couponCode: string
}

const deleteCheckoutCoupon = async (params: DeleteCheckoutCouponParams) => {
  const client = makeGraphQLClient()
  const { checkoutId, couponCode } = params

  const response = await client.request({
    document: deleteCheckoutCouponMutation,
    variables: { checkoutId, couponCode },
  })

  return response?.deleteCheckoutCoupon
}

/**
 * [Mutation hook] useDeleteCheckoutCouponMutation uses the graphQL mutation
 *
 * <b>deleteCheckoutCoupon(checkoutId: String!, couponCode: String!): Checkout</b>
 *
 * Description : Removes the coupons that had been applied to the checkout.
 *
 * Parameters passed to function deleteCheckoutCoupon(params: DeleteCheckoutCouponParams) => expects checkoutId and couponCode
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.deleteCheckoutCoupon' which removes the applied coupon on checkout page
 */
export const useDeleteCheckoutCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteCheckoutCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
