import { useQuery } from 'react-query'

import { searchSuggestionResult } from '../../../__mocks__/stories/searchSuggestionResultMock'

import type { SearchSuggestionResult } from '@/lib/gql/types'
export interface SearchSuggestionResultType {
  data: SearchSuggestionResult

  isLoading: boolean

  isSuccess: boolean
}

const getSearchSuggestionResult = async () => searchSuggestionResult

export const useSearchSuggestions = (): SearchSuggestionResultType => {
  const {
    data = {},

    isLoading,

    isSuccess,
  } = useQuery(['LOAD_SEARCH_SUGGESTIONS'], () => getSearchSuggestionResult())

  return { data, isLoading, isSuccess }
}
