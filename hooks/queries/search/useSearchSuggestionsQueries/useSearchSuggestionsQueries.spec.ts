import { renderHook } from '@testing-library/react-hooks'

import { useSearchSuggestionsQueries } from './useSearchSuggestionsQueries'
import { searchSuggestionResultMock } from '@/__mocks__/stories/searchSuggestionResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useSearchSuggestionsQueries', () => {
  it('should return search suggestions when entered search term', async () => {
    const { result, waitFor } = renderHook(() => useSearchSuggestionsQueries('dog gear'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(searchSuggestionResultMock)
  })
})
