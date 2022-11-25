import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { OrderInput } from '@/lib/gql/types'

export interface MultiShipShippingInfo {
  orderId: string
  updateMode: string
  version?: string
  orderInput: OrderInput
}

const updateShippingInfo = async (shippingInfo: MultiShipShippingInfo) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: setPersonalInfo,
    variables: shippingInfo,
  })

  //   return response?.checkout
  return {
    id: 1,
  }
}

const useUpdateCheckoutShippingInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updateShippingInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}

export const useUpdateMultiShipCheckoutShippingInfoMutation = useUpdateCheckoutShippingInfoMutation
