import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addPaymentMethodToCheckout, setBillingInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { BillingInfoInput, PaymentActionInput } from '@/lib/gql/types'

export interface UpdateBillingInfoInput {
  orderId: string
  billingInfoInput: BillingInfoInput
}

const updateBillingInfo = async (params: UpdateBillingInfoInput) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: setBillingInfo,
    variables: params,
  })

  return response?.updateOrderBillingInfo
}

export const useUpdateCheckoutBillingInfo = () => {
  const queryClient = useQueryClient()

  return useMutation(updateBillingInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
