/**
 * @module useUpdateOrderShippingInfo
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { updateShippingAndSuggestions } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

export interface EddSuggestionsParam {
  locationCode: string
  suggestionType?: string
  quantity: number
  productCode: string
  futureDate?: string
}
export interface UpdateShippingAndSuggestionsParams {
  orderId: string
  orderItemId: string
  itemFulfillmentInfoInput: {
    shippingMethodCode?: string
    shippingMethodName?: string
    expectedDeliveryDate?: string
    deliveryWindow?: {
      startTime: string
      endTime: string
    }
    suggestions?: EddSuggestionsParam[]
  }
}

/**
 * @hidden
 */
const updateShippingAndSuggestionsMutation = async (params: UpdateShippingAndSuggestionsParams) => {
  const client = makeGraphQLClientWithoutUserClaims()

  const response = await client.request({
    document: updateShippingAndSuggestions,
    variables: params,
  })

  return response?.updateShippingAndSuggestions
}

/**
 * [Mutation hook] updateShippingAndSuggestionsMutation uses the graphQL mutation
 *
 * <b>updateShippingAndSuggestionsMutation(orderId: $orderId, orderItemId: $orderItemId,updateMode: $updateMode, itemFulfillmentInfoInput: $itemFulfillmentInfoInput): CrOrder</b>
 *
 * Description : Updates user shipping(fulfillment) info at checkout
 *
 * Parameters passed to function updateShippingAndSuggestionsMutation(params: UpdateShippingAndSuggestionsParams) => expects object of type ' UpdateShippingAndSuggestionsParams' containing  orderId, orderItemId and itemFulfillmentInfoInput
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.updateShippingAndSuggestions', which contains updated shipping checkout information
 */

export const useUpdateShippingAndSuggestionsMutation = () => {
  const queryClient = useQueryClient()

  return {
    updateShippingAndSuggestionsMutation: useMutation({
      mutationFn: updateShippingAndSuggestionsMutation,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
