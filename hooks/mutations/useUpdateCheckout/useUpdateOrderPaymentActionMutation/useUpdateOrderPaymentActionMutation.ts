import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateOrderPaymentAction } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

export interface UpdateOrderPaymentActionParams {
  orderId: string
  paymentId: string
  paymentAction: PaymentActionInput
}

const updateOrderPaymentActionMutation = async (params: UpdateOrderPaymentActionParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateOrderPaymentAction,
    variables: params,
  })

  return response?.createOrderPaymentPaymentAction
}

export const useUpdateOrderPaymentActionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updateOrderPaymentActionMutation, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
