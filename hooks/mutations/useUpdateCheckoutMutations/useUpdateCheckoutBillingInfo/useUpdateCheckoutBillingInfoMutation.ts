/**
 * @module useUpdateCheckoutBillingInfoMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setBillingInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrBillingInfoInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UpdateBillingInfoInput {
  orderId: string
  billingInfoInput: CrBillingInfoInput
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
 * [Mutation hook] useUpdateCheckoutBillingInfoMutation uses the graphQL mutation
 *
 * <b>updateOrderBillingInfo(orderId: String!, updateMode: String, version: String, billingInfoInput: BillingInfoInput): BillingInfo</b>
 *
 * Description : Updates user billing info at checkout
 *
 * Parameters passed to function updateBillingInfo(params: UpdateBillingInfoInput) => expects object of type 'UpdateBillingInfoInput' containing orderId and billingInfo input
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateOrderBillingInfo', which contains updated billing details of user
 */

export const useUpdateCheckoutBillingInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updateBillingInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
