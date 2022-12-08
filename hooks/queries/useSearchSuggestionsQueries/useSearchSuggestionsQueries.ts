/**
 * @module useSearchSuggestionsQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSearchSuggestionsQuery } from '@/lib/gql/queries'
import { searchKeys } from '@/lib/react-query/queryKeys'

import type { SearchSuggestionResult } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface SearchSuggestionResultType {
  data: SearchSuggestionResult
  isLoading: boolean
  isSuccess: boolean
}

const getSearchSuggestionResult = async (searchTerm: string) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getSearchSuggestionsQuery,
    variables: { query: searchTerm },
  })
  return response.suggestionSearch
}

/**
 * [Query hook] useSearchSuggestionsQueries uses the graphQL query
 *
 * <b>suggestionSearch(query: String, groups: String, pageSize: Int, mid: String, filter: String): SearchSuggestionResult</b>
 *
 * Description : Fetches the search suggestions based on search keyword.
 * User search by any keyword on header's search bar, and result of search suggestion displayed on popover.
 *
 * Parameters passed to function getSearchSuggestionResult(searchTerm: string) => expects searchTerm
 *
 * On success, returns the received search suggestions.
 *
 * @param searchTerm Expect user entered search keyword to search the result.
 *
 * @returns 'response.suggestionSearch', which contains the search suggestions based on search request.
 */

export const useSearchSuggestionsQueries = (searchTerm: string): SearchSuggestionResultType => {
  const {
    data = {},
    isLoading,
    isSuccess,
  } = useQuery(
    searchKeys.suggestions(searchTerm),
    () => (searchTerm ? getSearchSuggestionResult(searchTerm) : {}),
    {
      refetchOnWindowFocus: false,
    }
  )

  return { data, isLoading, isSuccess }
}
