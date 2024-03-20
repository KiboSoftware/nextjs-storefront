/**
 * @module useGetSearchSuggestion2
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSearchSuggestion2Query } from '@/lib/gql/queries'
import { searchKeys } from '@/lib/react-query/queryKeys'

import type { SearchSuggestionResult } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface SearchSuggestion2ResultType {
  data: SearchSuggestionResult
  isLoading: boolean
  isSuccess: boolean
}

const getSearchSuggestionResult = async (searchTerm: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getSearchSuggestion2Query,
    variables: { query: searchTerm },
  })

  return response.suggestionSearch2
}

/**
 * [Query hook] useGetSearchSuggestion2 uses the graphQL query
 *
 * <b>suggestionSearch2(query: String, groups: String, pageSize: Int, mid: String, filter: String): SearchSuggestionResult</b>
 *
 * Description : Fetches the search suggestions based on search keyword.
 * User search by any keyword on header's search bar, and result of search suggestion displayed on popover.
 *
 * Parameters passed to function getSearchSuggestion2Result(searchTerm: string) => expects searchTerm
 *
 * On success, returns the received search suggestions.
 *
 * @param searchTerm Expect user entered search keyword to search the result.
 *
 * @returns 'response.suggestionSearch2', which contains the search suggestions based on search request.
 */

export const useGetSearchSuggestion2 = (searchTerm: string): SearchSuggestion2ResultType => {
  const {
    data = {},
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: searchKeys.suggestions(searchTerm),
    queryFn: () => (searchTerm ? getSearchSuggestionResult(searchTerm) : {}),
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, isSuccess }
}
