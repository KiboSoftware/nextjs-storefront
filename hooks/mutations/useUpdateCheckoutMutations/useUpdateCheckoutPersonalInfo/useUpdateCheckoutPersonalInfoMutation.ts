import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { OrderInput } from '@/lib/gql/types'

export interface PersonalInfo {
  orderId: string
  updateMode: string
  version?: string
  orderInput: OrderInput
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
 * [ Mutation hook => checkout: updateOrder(orderId: $orderId, updateMode: $updateMode, orderInput: $orderInput) ]
 *
 * Description : It updates user personal info at checkout
 *
 * Parameters passed to function updatePersonalInfo(personalInfo: PersonalInfo) => expects object of type ' PersonalInfo' containing  orderId,updateMode , version ,orderInput
 *
 * On success, calls invalidateQueries on checkoutKeys
 * @returns 'response?.checkout' containing updated checkout information
 */

export const useUpdateCheckoutPersonalInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
