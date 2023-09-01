/**
 * @module useUpdateQuote
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteMutation } from '@/lib/gql/mutations'
import { buildUpdateQuoteParams } from '@/lib/helpers'
import { quoteKeys } from '@/lib/react-query/queryKeys'

import { Quote } from '@/lib/gql/types'

/**
 * @hidden
 */

interface UpdateQuoteProps {
  quoteId: string
  updateMode: string
  name: string
}
const updateQuote = async (props: UpdateQuoteProps): Promise<Quote> => {
  const client = makeGraphQLClient()
  const { quoteId, updateMode, name } = props

  const variables = buildUpdateQuoteParams(quoteId, updateMode, name)

  const response = await client.request({
    document: updateQuoteMutation,
    variables,
  })

  return response?.updateQuote
}
/**
 * [Mutation hook] useUpdateQuote uses the graphQL mutation
 *
 * <b>updateQuote($quoteId: String!, updateMode: String, $quoteInput: QuoteInput): Quote</b>
 *
 * Description : update a quote
 *
 * Parameters passed to function updateQuote(props: UpdateQuoteProps) => expects object of type 'UpdateQuoteProps' containing quoteId, updateMode, name
 *
 * On success, calls invalidateQueries on quoteKeys and fetches the updated result.
 *
 * @returns 'response?.updateQuote' which contains object of quote updated
 */
export const useUpdateQuote = () => {
  const queryClient = useQueryClient()
  return {
    updateQuote: useMutation({
      mutationFn: updateQuote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: quoteKeys.all })
      },
    }),
  }
}
