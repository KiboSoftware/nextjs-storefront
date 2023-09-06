/**
 * @module useUpdateQuoteFulfillmentInfo
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteFulfillmentInfo } from '@/lib/gql/mutations'
import {
  buildUpdateQuoteFulfillmentInfoParams,
  UpdateQuoteFulfillmentInfoParams,
} from '@/lib/helpers'
import { quoteKeys } from '@/lib/react-query/queryKeys'

import type { CrFulfillmentInfoInput, Quote } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface QuoteFulfillmentInfo {
  quoteId: string
  fulfillmentInfoInput: CrFulfillmentInfoInput
}

const updateQuoteFulfillment = async (params: UpdateQuoteFulfillmentInfoParams): Promise<Quote> => {
  const client = makeGraphQLClient()

  const shippingInfo = buildUpdateQuoteFulfillmentInfoParams(params)

  const response = await client.request({
    document: updateQuoteFulfillmentInfo,
    variables: shippingInfo,
  })

  return response?.updateQuoteFulfillmentInfo
}

/**
 * [Mutation hook] useUpdateQuoteFulfillmentInfo uses the graphQL mutation
 *
 * <b>updateOrderFulfillmentInfo(orderId: String!, updateMode: String, version: String, fulfillmentInfoInput: FulfillmentInfoInput): FulfillmentInfo</b>
 *
 * Description : Updates user shipping(fulfillment) info at checkout
 *
 * Parameters passed to function updateShippingInfo(params: CheckoutShippingParams) => expects object of type ' ShippingInfo' containing  orderId and fulfillmentInfoInput
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result.
 *
 * @returns 'response?.updateQuoteFulfillmentInfo', which contains updated shipping quote information
 */

export const useUpdateQuoteFulfillmentInfo = () => {
  const queryClient = useQueryClient()

  return {
    updateQuoteFulfillmentInfo: useMutation({
      mutationFn: updateQuoteFulfillment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
      },
    }),
  }
}
