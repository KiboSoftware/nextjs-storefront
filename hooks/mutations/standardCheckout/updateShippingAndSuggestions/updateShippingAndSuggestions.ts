/**
 * @module useUpdateOrderShippingInfo
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { updateShippingAndSuggestions } from '@/lib/gql/mutations'
import {
  buildCheckoutShippingParams,
  CheckoutShippingParams,
} from '@/lib/helpers/buildCheckoutShippingParams'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrFulfillmentInfoInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface ShippingInfo {
  orderId: string
  fulfillmentInfoInput: CrFulfillmentInfoInput
}

const updateShippingAndSuggestionsMutation = async (params: CheckoutShippingParams) => {
  const client = makeGraphQLClientWithoutUserClaims()

  const shippingInfo = buildCheckoutShippingParams(params)

  const response = await client.request({
    document: updateShippingAndSuggestions,
    variables: shippingInfo,
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
 * Parameters passed to function updateShippingAndSuggestionsMutation(params: CheckoutShippingParams) => expects object of type ' ShippingInfo' containing  orderId, orderItemId and itemFulfillmentInfoInput
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
