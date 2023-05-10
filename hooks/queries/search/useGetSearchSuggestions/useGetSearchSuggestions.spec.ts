import { renderHook } from '@testing-library/react-hooks'

import { useGetSearchSuggestions } from './useGetSearchSuggestions'
import { searchSuggestionResultMock } from '@/__mocks__/stories/searchSuggestionResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetSearchSuggestions', () => {
  it('should return search suggestions when entered search term', async () => {
    const { result, waitFor } = renderHook(() => useGetSearchSuggestions('dog gear'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(searchSuggestionResultMock)
  })
})
