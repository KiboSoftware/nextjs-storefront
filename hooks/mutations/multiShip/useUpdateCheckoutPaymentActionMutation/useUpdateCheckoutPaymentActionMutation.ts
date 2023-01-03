import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCheckoutPaymentActionMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

export interface UpdateCheckoutPaymentActionInput {
  checkoutId: string
  paymentId: string
  paymentAction: PaymentActionInput
}

const updateCheckoutPayment = async (params: UpdateCheckoutPaymentActionInput) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateCheckoutPaymentActionMutation,
    variables: params,
  })

  return response?.updateCheckoutPaymentAction
}

export const useUpdateCheckoutPaymentActionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updateCheckoutPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}

export const useUpdateMultiShipCheckoutPaymentActionMutation =
  useUpdateCheckoutPaymentActionMutation
