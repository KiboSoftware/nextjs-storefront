import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { splitOrderShipment } from '@/lib/gql/mutations'
import { splitOrderShipmentKeys } from '@/lib/react-query/queryKeys'

import type { SplitShipmentsObjectInput } from '@/lib/gql/types'

export interface UseSplitItem {
  orderId: string
  shipmentNumber: string
  splitShipmentsObjectInput: SplitShipmentsObjectInput
}

const splitItem = async (params: UseSplitItem) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: splitOrderShipment,
    variables: params,
  })

  return response?.splitOrderShipment
}

export const useSplitItemMutations = (params: UseSplitItem) => {
  const queryClient = useQueryClient()

  return useMutation(splitItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(splitOrderShipmentKeys.orderId(params.orderId))
    },
  })
}
