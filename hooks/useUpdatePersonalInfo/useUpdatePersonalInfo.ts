import { useMutation, useQueryClient } from 'react-query'

import { OrderInput } from '../../lib/gql/types'
import { checkoutKeys } from '../../lib/react-query/queryKeys'
import { makeGraphQLClient } from '@/lib/gql/client'
import { updateOrder } from '@/lib/gql/mutations/checkout/update-order'

export interface PersonalInfo {
  orderId: string
  updateMode: string
  version?: string
  orderInput: OrderInput
}

const updatePersonalInfo = async (personalInfo: PersonalInfo) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateOrder,
    variables: personalInfo,
  })

  return response?.checkout
}

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.detail])
    },
  })
}
