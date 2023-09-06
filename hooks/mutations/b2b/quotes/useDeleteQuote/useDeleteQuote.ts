/**
 * @module useDeleteQuote
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteQuoteMutation } from '@/lib/gql/mutations'
import { b2bQuotesKeys, quoteKeys } from '@/lib/react-query/queryKeys'

const client = makeGraphQLClient()

const deleteB2BQuote = async (props: { quoteId: string; draft: boolean }) => {
  const { quoteId, draft } = props
  const response = await client.request({
    document: deleteQuoteMutation,
    variables: {
      quoteId,
      draft,
    },
  })

  return response?.deleteQuote
}

/**
 * [Mutation hook] useDeleteQuote uses the graphQL mutation
 *
 * <b>deleteQuote(quoteId: String!, draft: Boolean): Boolean</b>
 *
 * Description : Removes a quote from quotes list
 *
 * Parameters passed to function deleteB2BQuote(quoteId: string) => expects quoteId as string
 *
 * On success, calls refetchQueries on b2bQuotesKeys and fetches quotes list.
 *
 * @returns 'response?.deleteQuote' which is a boolean
 */

export const useDeleteQuote = ({ draft }: { draft: boolean }) => {
  const queryClient = useQueryClient()
  return {
    deleteQuote: useMutation({
      mutationFn: deleteB2BQuote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: b2bQuotesKeys.quotesParams({}) })
        if (draft) {
          queryClient.invalidateQueries({ queryKey: quoteKeys.all })
        }
      },
    }),
  }
}
