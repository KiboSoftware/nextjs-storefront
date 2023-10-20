/**
 * @module useUpdateQuoteCoupon
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteCouponMutation } from '@/lib/gql/mutations'
import { quoteKeys } from '@/lib/react-query/queryKeys'

interface UpdateQuoteCouponParams {
  quoteId: string
  couponCode: string
  updateMode?: string
}

const updateQuoteCoupon = async (params: UpdateQuoteCouponParams) => {
  const client = makeGraphQLClient()
  const { quoteId, couponCode, updateMode } = params

  const variables = {
    quoteId,
    couponCode,
    updateMode,
  }

  const response = await client.request({
    document: updateQuoteCouponMutation,
    variables,
  })

  return response?.updateQuoteCoupon
}

/**
 * [Mutation hook] useUpdateQuoteCoupon uses the graphQL mutation
 *
 * <b>updateQuoteCoupon(quoteId: String!, couponCode: String!, updateMode: String): Quote</b>
 *
 * Description : Applies promo code in Quote Summary of quote details pages
 *
 * Parameters passed to function updateQuoteCoupon(params: UpdateQuoteCouponParams) => expects object of type 'UpdateQuoteCouponParams' containing quoteId, updateMode and couponCode
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result
 *
 * @returns 'response?.updateQuoteCoupon' which applies the coupon on quote details page((if coupon is valid))
 */
export const useUpdateQuoteCoupon = () => {
  const queryClient = useQueryClient()
  return {
    updateQuoteCoupon: useMutation({
      mutationFn: updateQuoteCoupon,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
      },
    }),
  }
}
