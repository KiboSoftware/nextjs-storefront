/**
 * @module useGetQuotes
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getQuotes } from '@/lib/gql/queries'
import { b2bQuotesKeys } from '@/lib/react-query/queryKeys'

import type { QueryQuotesArgs, QuoteCollection } from '@/lib/gql/types'

/**
 * @hidden
 */

const client = makeGraphQLClient()

const fetchQuotes = async (param: QueryQuotesArgs): Promise<QuoteCollection> => {
  const response = await client.request({
    document: getQuotes,
    variables: { ...param },
  })

  return response?.quotes
}

/**
 * [Query hook] useGetQuotes uses the graphQL query
 *
 * <b>quotes(startIndex: Int, pageSize: Int, sortBy: String, filter: String, q: String, qLimit: Int): QuoteCollection</b>
 *
 * Description : Fetches the B2B Quotes list based on startIndex, pageSize, sortBy, filter, q and qLimit.
 *
 * Parameters passed to function fetchQuotes({startIndex, pageSize, sortBy, filter, q , qLimit}: QueryB2bAccountUsersArgs) => expects object of type QueryQuotesArgs containing startIndex, pageSize, sortBy, filter, q and qLimit.
 *
 * @returns 'response?.quotes', which contains list of Quotes.
 */

export const useGetQuotes = (param: QueryQuotesArgs, initialData?: any) => {
  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryKey: b2bQuotesKeys.quotesParams(param),
    queryFn: () => fetchQuotes(param),
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
  })

  useQuery({
    queryKey: b2bQuotesKeys.quotesParams({
      ...param,
      startIndex: (param?.startIndex as number) + (param?.pageSize as number),
    }),
    queryFn: () =>
      fetchQuotes({
        ...param,
        startIndex: (param?.startIndex as number) + (param?.pageSize as number),
      }),
  })

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
