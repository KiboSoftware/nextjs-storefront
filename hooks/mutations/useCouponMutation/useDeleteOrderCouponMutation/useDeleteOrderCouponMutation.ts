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

export const useDeleteOrderCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteOrderCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
