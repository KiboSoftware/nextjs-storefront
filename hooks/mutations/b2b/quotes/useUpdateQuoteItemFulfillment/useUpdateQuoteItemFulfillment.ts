/**
 * @module useUpdateQuoteItemFulfillment
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteItemFulfillmentMutation } from '@/lib/gql/mutations'
import { buildUpdateQuoteItemFulfillmentParams } from '@/lib/helpers'
import { quoteKeys, quoteShippingMethodKeys } from '@/lib/react-query/queryKeys'
import type { ShouldFetchShippingMethods } from '@/lib/types'

import { Quote } from '@/lib/gql/types'

/**
 * @hidden
 */

interface UpdateQuoteItemFulfillmentProps {
  quoteId: string
  quoteItemId: string
  updateMode: string
  product: any
  quantity: number
  fulfillmentMethod: string
  locationCode: string
}

const updateQuoteItemFulfillment = async (
  props: UpdateQuoteItemFulfillmentProps
): Promise<Quote> => {
  const client = makeGraphQLClient()
  const { quoteId, quoteItemId, quantity, updateMode, product, fulfillmentMethod, locationCode } =
    props

  const variables = buildUpdateQuoteItemFulfillmentParams(
    quoteId,
    quoteItemId,
    updateMode,
    product,
    quantity,
    fulfillmentMethod,
    locationCode
  )

  const response = await client.request({
    document: updateQuoteItemFulfillmentMutation,
    variables,
  })

  return response?.updateQuoteItemFulfillment
}
/**
 * [Mutation hook] useUpdateQuoteItemFulfillment uses the graphQL mutation
 *
 * <b>updateQuoteItemFulfillment($quoteId: String!, updateMode: String, $orderItemInput: crOrderItemInput): Quote</b>
 *
 * Description : update the fulfillment for particular quote item
 *
 * Parameters passed to function updateQuoteItemFulfillment(props: UpdateQuoteItemFulfillmentProps) => expects object of type quoteId, updateMode, product, quantity containing product and quantity
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result.
 *
 * @returns 'response?.updateQuoteItemFulfillment' which contains object of product items added to quote and it's quantity
 */
export const useUpdateQuoteItemFulfillment = ({
  shouldFetchShippingMethods,
}: ShouldFetchShippingMethods) => {
  const queryClient = useQueryClient()
  return {
    updateQuoteItemFulfillment: useMutation({
      mutationFn: updateQuoteItemFulfillment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
        if (shouldFetchShippingMethods) {
          queryClient.invalidateQueries({ queryKey: quoteShippingMethodKeys.all })
        }
      },
    }),
  }
}
