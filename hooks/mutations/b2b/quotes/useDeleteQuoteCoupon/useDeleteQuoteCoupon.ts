/**
 * @module useDeleteQuoteCoupon
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteQuoteCouponMutation } from '@/lib/gql/mutations'
import { quoteKeys } from '@/lib/react-query/queryKeys'

interface DeleteQuoteCouponParams {
  quoteId: string
  couponCode: string
  updateMode?: string
}

const deleteQuoteCoupon = async (params: DeleteQuoteCouponParams) => {
  const client = makeGraphQLClient()
  const { quoteId, couponCode, updateMode } = params

  const variables = {
    quoteId,
    couponCode,
    updateMode,
  }

  const response = await client.request({
    document: deleteQuoteCouponMutation,
    variables,
  })

  return response?.deleteQuoteCoupon
}

/**
 * [Mutation hook] useDeleteQuoteCoupon uses the graphQL mutation
 *
 * <b>deleteQuoteCoupon(quoteId: String!, couponCode: String!, updateMode: String): Quote</b>
 *
 * Description : remove Applied promo code in Quote Summary of quote details pages
 *
 * Parameters passed to function deleteQuoteCoupon(params: DeleteQuoteCouponParams) => expects object of type 'DeleteQuoteCouponParams' containing quoteId, updateMode and couponCode
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result
 *
 * @returns 'response?.deleteQuoteCoupon' which applies the coupon on quote details page((if coupon is valid))
 */
export const useDeleteQuoteCoupon = () => {
  const queryClient = useQueryClient()
  return {
    deleteQuoteCoupon: useMutation({
      mutationFn: deleteQuoteCoupon,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
      },
    }),
  }
}
