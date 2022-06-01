import { useQuery, useQueryClient } from 'react-query'

import { searchSuggestionResult } from '@/__mocks__/stories/searchSuggestionResultMock'
import { makeGraphQLClient } from '@/lib/gql/client'
import { getSearchSuggestionsQuery } from '@/lib/gql/queries/get-search-suggestions'

import type { SearchSuggestionResult } from '@/lib/gql/types'
export interface SearchSuggestionResultType {
  data: SearchSuggestionResult
  isLoading: boolean
  isSuccess: boolean
}

const getSearchSuggestionResult = async (searchTerm?: string) => {
  return searchSuggestionResult
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getSearchSuggestionsQuery,
    variables: { searchTerm },
  })

  return response
}

export const useSearchSuggestions = (searchTerm?: string): SearchSuggestionResultType => {
  const {
    data = {},

    isLoading,

    isSuccess,
  } = useQuery(['LOAD_SEARCH_SUGGESTIONS'], () => getSearchSuggestionResult(searchTerm))

  return { data, isLoading, isSuccess }
}
