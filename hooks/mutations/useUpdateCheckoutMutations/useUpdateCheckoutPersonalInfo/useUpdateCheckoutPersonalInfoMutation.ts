/**
 * @module useUpdateCheckoutPersonalInfoMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrderInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface PersonalInfo {
  orderId: string
  updateMode: string
  version?: string
  orderInput: CrOrderInput
}

const updatePersonalInfo = async (personalInfo: PersonalInfo) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: setPersonalInfo,
    variables: personalInfo,
  })

  return response?.checkout
}

/**
 * [Mutation hook] useUpdateCheckoutPersonalInfoMutation uses the graphQL mutation
 *
 * <b>updateOrder(orderId: String!,updateMode: String, version: String, orderInput: OrderInput): Order</b>
 *
 * Description : Updates user personal info at checkout
 *
 * Parameters passed to function updatePersonalInfo(personalInfo: PersonalInfo) => expects object of type ' PersonalInfo' containing  orderId,updateMode , version ,orderInput
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateOrderBillingInfo', which contains updated checkout information
 */

export const useUpdateCheckoutPersonalInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
