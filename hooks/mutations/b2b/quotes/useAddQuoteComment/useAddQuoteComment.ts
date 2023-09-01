/**
 * @module useAddQuoteComment
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteCommentsMutation } from '@/lib/gql/mutations'
import { quoteKeys } from '@/lib/react-query/queryKeys'

import { QuoteComment, QuoteCommentInput } from '@/lib/gql/types'

const client = makeGraphQLClient()

interface AddQuoteCommentProps {
  quoteId: string
  updateMode: string
  quoteCommentInput: QuoteCommentInput
}

const addQuoteComment = async (params: AddQuoteCommentProps): Promise<QuoteComment> => {
  const response = await client.request({
    document: updateQuoteCommentsMutation,
    variables: params,
  })

  return response?.updateQuotesComments
}

/**
 * [Mutation hook] useAddQuoteComment uses the graphQL mutation
 *
 * <b>addQuoteComment({quoteId: String!, updateMode: String, quoteCommentInput: QuoteCommentInput}): QuoteComment</b>
 *
 * Description : Adds a comment for a quote
 *
 * Parameters passed to function addQuoteComment(params: AddQuoteCommentProps) => expects object of type 'AddQuoteCommentProps' containing quoteId, updateMode, quoteCommentInput
 *
 * On success, calls invalidateQueries on current quote and fetches quote details.
 *
 * @returns 'response?.updateQuotesComments' which is a boolean
 */

export const useAddQuoteComment = () => {
  const queryClient = useQueryClient()
  return {
    addComment: useMutation({
      mutationFn: addQuoteComment,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: quoteKeys.all }),
    }),
  }
}
