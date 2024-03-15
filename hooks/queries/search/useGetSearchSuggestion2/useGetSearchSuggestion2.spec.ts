import { renderHook, waitFor } from '@testing-library/react'

import { useGetSearchSuggestion2 } from './useGetSearchSuggestion2'
import { searchSuggestion2ResultMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetSearchSuggestion2', () => {
  it('should return search suggestions when entered search term', async () => {
    const { result } = renderHook(() => useGetSearchSuggestion2('jacket'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(searchSuggestion2ResultMock)
    })
  })
})
