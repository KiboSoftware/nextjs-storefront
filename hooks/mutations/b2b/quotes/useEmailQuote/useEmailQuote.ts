/**
 * @module useDeleteQuote
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateQuoteEmailMutation } from '@/lib/gql/mutations'
import { b2bQuotesKeys } from '@/lib/react-query/queryKeys'

const client = makeGraphQLClient()

interface SendQuoteEmailParams {
  quoteId: string
  emails: string[]
}

const sendQuoteEmail = async (params: SendQuoteEmailParams) => {
  const response = await client.request({
    document: updateQuoteEmailMutation,
    variables: {
      quoteId: params.quoteId,
      graphQLString: params.emails,
    },
  })

  return response?.updateQuoteEmail
}

/**
 * [Mutation hook] useEmailQuote uses the graphQL mutation
 *
 * <b>updateQuoteEmail(quoteId: String! , graphQLString: [String]): Boolean</b>
 *
 * Description : Sends emails of a single quote
 *
 * Parameters passed to function sendQuoteEmail(quoteId: string, emails: string[]) => expects quoteId as string and emails as array of strings
 *
 * On success, calls refetchQueries on b2bQuotesKeys and fetches quotes list.
 *
 * @returns 'response?.updateQuoteEmail' which is a boolean
 */

export const useEmailQuote = () => {
  const queryClient = useQueryClient()
  return {
    emailQuote: useMutation({
      mutationFn: sendQuoteEmail,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: b2bQuotesKeys.quotesParams({}) }),
    }),
  }
}
