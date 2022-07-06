import { renderHook } from '@testing-library/react-hooks'

import { useStoreLocations } from './useStoreLocations'
import { searchSuggestionResultMock } from '@/__mocks__/stories/searchSuggestionResultMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useStoreLocations', () => {
  it('should return search loactions when entered search term', async () => {
    const { result, waitFor } = renderHook(
      () => useStoreLocations('zipcode', { latitude: 0, longitude: 0 }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(searchSuggestionResultMock)
  })
})
