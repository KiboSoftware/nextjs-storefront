import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addPaymentMethodToCheckout } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { PaymentActionInput } from '@/lib/gql/types'

export interface PaymentMethodInput {
  orderId: string
  paymentAction: PaymentActionInput
}

const updatePaymentMethod = async (params: PaymentMethodInput) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: addPaymentMethodToCheckout,
    variables: params,
  })

  return response?.createOrderPaymentAction
}

export const useCreateCheckoutPaymentMethod = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePaymentMethod, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
