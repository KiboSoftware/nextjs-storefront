import { renderHook, waitFor } from '@testing-library/react'

import { useGetStoreLocations } from './useGetStoreLocations'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const location = locationCollectionMock.spLocations?.items || []
describe('[hooks] useGetStoreLocations', () => {
  it('should return loactions with the filter by geo location', async () => {
    const { result } = renderHook(
      () => useGetStoreLocations({ filter: 'geo near(87110,160934)' }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => expect(result.current.data).toEqual(location))
  })
})
