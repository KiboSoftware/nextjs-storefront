import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCartCouponMutation } from '@/lib/gql/mutations'
import { cartKeys } from '@/lib/react-query/queryKeys'

interface UpdateCartCouponParams {
  cartId: string
  couponCode: string
}

const updateCartCoupon = async (params: UpdateCartCouponParams) => {
  const client = makeGraphQLClient()
  const { cartId, couponCode } = params

  const variables = {
    cartId,
    couponCode,
  }
  const response = await client.request({
    document: updateCartCouponMutation,
    variables,
  })

  return response?.updateCartCoupon
}

export const useUpdateCartCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(updateCartCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(cartKeys.all)
    },
  })
}
