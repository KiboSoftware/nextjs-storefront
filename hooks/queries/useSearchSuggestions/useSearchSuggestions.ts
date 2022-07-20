import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSearchSuggestionsQuery } from '@/lib/gql/queries'
import { searchKeys } from '@/lib/react-query/queryKeys'

import type { SearchSuggestionResult } from '@/lib/gql/types'

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

export const useSearchSuggestions = (searchTerm: string): SearchSuggestionResultType => {
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
