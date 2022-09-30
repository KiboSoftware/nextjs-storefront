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

export const useUpdateOrderCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(updateOrderCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
