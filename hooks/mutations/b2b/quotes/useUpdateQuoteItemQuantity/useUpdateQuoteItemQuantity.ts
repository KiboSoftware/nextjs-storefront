/**
 * @module useUpdateQuoteItemFulfillment
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteItemQuantityMutation } from '@/lib/gql/mutations'
import { quoteKeys, quoteShippingMethodKeys } from '@/lib/react-query/queryKeys'
import type { ShouldFetchShippingMethods } from '@/lib/types'

import { Quote } from '@/lib/gql/types'

/**
 * @hidden
 */

interface UpdateQuoteItemQuantityProps {
  quoteId: string
  updateMode: string
  quoteItemId: string
  quantity: number
  shouldFetchShippingMethods?: boolean
}

const updateQuoteItemQuantity = async (props: UpdateQuoteItemQuantityProps): Promise<Quote> => {
  const client = makeGraphQLClient()
  const { quoteId, updateMode, quoteItemId, quantity } = props

  const variables = { quoteId, quoteItemId, quantity, updateMode }

  const response = await client.request({
    document: updateQuoteItemQuantityMutation,
    variables,
  })

  return response?.updateQuoteItemQuantity
}
/**
 * [Mutation hook] updateQuoteItemQuantity uses the graphQL mutation
 *
 * <b>updateQuoteItemQuantity(quoteId: $quoteId, quoteItemId: $quoteItemId, quantity: $quantity, updateMode: $updateMode): Quote</b>
 *
 * Description : update the product quantity in the quote
 *
 * Parameters passed to function updateQuoteItemQuantity(props: UpdateQuoteItemQuantityProps) => expects object of type quoteId, updateMode, quoteItemId, quantity
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result.
 *
 * @returns 'response?.updateQuoteItemQuantity' which contains object of product items added to quote and it's quantity
 */
export const useUpdateQuoteItemQuantity = ({
  shouldFetchShippingMethods,
}: ShouldFetchShippingMethods) => {
  const queryClient = useQueryClient()
  return {
    updateQuoteItemQuantity: useMutation({
      mutationFn: updateQuoteItemQuantity,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
        if (shouldFetchShippingMethods) {
          queryClient.invalidateQueries({ queryKey: quoteShippingMethodKeys.all })
        }
      },
    }),
  }
}
