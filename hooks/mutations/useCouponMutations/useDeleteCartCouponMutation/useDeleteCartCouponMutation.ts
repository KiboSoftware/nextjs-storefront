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

export const useDeleteCartCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteCartCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.all)
    },
  })
}
