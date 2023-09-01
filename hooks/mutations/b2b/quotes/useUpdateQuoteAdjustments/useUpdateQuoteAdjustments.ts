/**
 * @module updateQuoteAdjustments
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteAdjustmentsMutation } from '@/lib/gql/mutations'
import { buildUpdateQuoteAdjustmentsParams } from '@/lib/helpers'
import { quoteKeys } from '@/lib/react-query/queryKeys'

import { Quote } from '@/lib/gql/types'

const client = makeGraphQLClient()

interface UpdateQuoteAdjustmentsProps {
  quoteId: string
  updateMode: string
  adjustment: number
  shippingAdjustment: number
  handlingAdjustment: number
}

const updateQuoteAdjustments = async (params: UpdateQuoteAdjustmentsProps): Promise<Quote> => {
  const variables = buildUpdateQuoteAdjustmentsParams(params)
  const response = await client.request({
    document: updateQuoteAdjustmentsMutation,
    variables,
  })

  return response?.updateQuoteAdjustments
}

/**
 * [Mutation hook] use uses tUpdateQuoteAdjustments graphQL mutation
 *
 * <b>updateQuoteAdjustments({quoteId: String!, updateMode: String, quoteAdjustmentInput: QuoteAdjustmentInput}): Quote</b>
 *
 * Description : update quote adjustments for a quote
 *
 * Parameters passed to function updateQuoteAdjustments(params: UpdateQuoteAdjustmentsProps) => expects object of type 'UpdateQuoteAdjustmentsProps' containing quoteId, updateMode, quoteAdjustmentInput
 *
 * On success, calls invalidateQueries on current quote and fetches quote details.
 *
 * @returns 'response?.updateQuoteAdjustments' which is a boolean
 */

export const useUpdateQuoteAdjustments = () => {
  const queryClient = useQueryClient()
  return {
    updateQuoteAdjustments: useMutation({
      mutationFn: updateQuoteAdjustments,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: quoteKeys.all }),
    }),
  }
}
