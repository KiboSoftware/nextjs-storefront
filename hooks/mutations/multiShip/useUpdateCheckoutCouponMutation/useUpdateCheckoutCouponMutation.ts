import { useMutation, useQueryClient } from 'react-query'

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

export const useUpdateCheckoutCouponMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(updateCheckoutCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
