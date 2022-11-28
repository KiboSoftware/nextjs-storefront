import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setBillingInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { BillingInfoInput } from '@/lib/gql/types'

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

/**
 * [ Mutation hook => updateOrderBillingInfo(orderId: $orderId, billingInfoInput: $billingInfoInput) ]
 *
 * Description : It updates user billing info at checkout
 *
 * Parameters passed to function updateBillingInfo(params: UpdateBillingInfoInput) => expects object of type 'UpdateBillingInfoInput' containing orderid and billinginfo input
 *
 * On success, calls invalidateQueries on checkoutKeys
 * @returns 'response?.updateOrderBillingInfo' containing updated billing details of user
 */
export const useUpdateCheckoutBillingInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updateBillingInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
