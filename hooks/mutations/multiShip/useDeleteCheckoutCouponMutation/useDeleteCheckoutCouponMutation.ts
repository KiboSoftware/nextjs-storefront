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

export const useDeleteCheckoutCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteCheckoutCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
