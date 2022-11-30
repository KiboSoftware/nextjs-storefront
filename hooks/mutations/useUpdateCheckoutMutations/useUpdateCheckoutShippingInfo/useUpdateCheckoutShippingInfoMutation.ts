import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { setShippingInfo } from '@/lib/gql/mutations'
import {
  buildCheckoutShippingParams,
  CheckoutShippingParams,
} from '@/lib/helpers/buildCheckoutShippingParams'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { FulfillmentInfoInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface ShippingInfo {
  orderId: string
  fulfillmentInfoInput: FulfillmentInfoInput
}

const updateShippingInfo = async (params: CheckoutShippingParams) => {
  const client = makeGraphQLClient()

  const shippingInfo = buildCheckoutShippingParams(params)

  const response = await client.request({
    document: setShippingInfo,
    variables: shippingInfo,
  })

  return response?.updateOrderFulfillmentInfo
}

/**
 * [ Mutation hook => updateOrderFulfillmentInfo(orderId: $orderId, fulfillmentInfoInput: $fulfillmentInfoInput) ]
 *
 * Description : It updates user shipping(fulfillment) info at checkout
 *
 * Parameters passed to function updateShippingInfo(params: CheckoutShippingParams) => expects object of type ' ShippingInfo' containing  orderId and fulfillmentInfoInput
 *
 * On success, calls invalidateQueries on checkoutKeys
 * @returns 'response?.updateOrderFulfillmentInfo' containing updated shipping checkout information
 */

export const useUpdateCheckoutShippingInfoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(updateShippingInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(checkoutKeys.all)
    },
  })
}
