import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setMultishipPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CheckoutInput } from '@/lib/gql/types'

export interface MultiShipPersonalInfo {
  checkoutId: string
  checkoutInput: CheckoutInput
}

const updatePersonalInfo = async (multiShipPersonalInfo: MultiShipPersonalInfo) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: setMultishipPersonalInfo,
    variables: multiShipPersonalInfo,
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

export const useUpdateMultiShipCheckoutPersonalInfo = useUpdateCheckoutPersonalInfo
