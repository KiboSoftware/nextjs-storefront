/**
 * @module useUpdateCheckoutCoupon
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCheckoutCouponMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

interface UpdateCheckoutCouponParams {
  checkoutId: string
  couponCode: string
}

const updateCheckoutCoupon = async (params: UpdateCheckoutCouponParams) => {
  const client = makeGraphQLClient()
  const { checkoutId, couponCode } = params

  const response = await client.request({
    document: updateCheckoutCouponMutation,
    variables: { checkoutId, couponCode },
  })

  return response?.updateCheckoutCoupon
}

/**
 * [Mutation hook] useUpdateCheckoutCoupon uses the graphQL mutation
 *
 * <b>updateCheckoutCoupon(checkoutId: String!, couponCode: String!): Checkout</b>
 *
 * Description : Applies or updates the coupon to the checkout page.
 *
 * Parameters passed to function updateCheckoutCoupon(params: UpdateCheckoutCouponParams) => expects checkoutId and couponCode
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateCheckoutCoupon' which applies the coupon on checkout page(if coupon is valid)
 */
export const useUpdateCheckoutCoupon = () => {
  const queryClient = useQueryClient()
  return {
    updateCheckoutCoupon: useMutation({
      mutationFn: updateCheckoutCoupon,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
