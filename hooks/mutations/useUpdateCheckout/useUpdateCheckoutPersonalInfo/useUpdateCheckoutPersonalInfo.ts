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

export const useUpdateCheckoutPersonalInfo = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
