import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { checkoutPaymentActionMutation } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

export interface CheckoutPaymentActionInput {
  checkoutId: string
  paymentAction: PaymentActionInput
}

const createCheckoutPayment = async (params: CheckoutPaymentActionInput) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: checkoutPaymentActionMutation,
    variables: params,
  })

  return response?.createCheckoutPaymentAction
}

export const useCreateCheckoutPaymentActionMutations = () => {
  const queryClient = useQueryClient()

  return useMutation(createCheckoutPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
