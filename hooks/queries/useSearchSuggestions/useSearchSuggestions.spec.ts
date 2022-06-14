import { renderHook } from '@testing-library/react-hooks'

import { useSearchSuggestions } from './useSearchSuggestions'
import { searchSuggestionResultMock } from '@/__mocks__/stories/searchSuggestionResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useSearchSuggestions', () => {
  it('should return search suggestions when entered search term', async () => {
    const { result, waitFor } = renderHook(() => useSearchSuggestions('dog gear'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(searchSuggestionResultMock)
  })
})
