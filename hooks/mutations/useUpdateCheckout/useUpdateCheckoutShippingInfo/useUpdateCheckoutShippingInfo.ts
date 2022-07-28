import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setShippingInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { FulfillmentInfoInput } from '@/lib/gql/types'

export interface ShippingInfo {
  orderId: string
  fulfillmentInfoInput: FulfillmentInfoInput
}

const updateShippingInfo = async (shippingInfo: ShippingInfo) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: setShippingInfo,
    variables: shippingInfo,
  })

  return response?.updateOrderFulfillmentInfo
}

export const useUpdateCheckoutShippingInfo = () => {
  const queryClient = useQueryClient()

  return useMutation(updateShippingInfo, {
    onSuccess: () => {
      queryClient.removeQueries([checkoutKeys.all])
    },
  })
}
