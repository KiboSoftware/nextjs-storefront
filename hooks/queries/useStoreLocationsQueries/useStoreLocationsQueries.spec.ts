import { renderHook } from '@testing-library/react-hooks'

import { useStoreLocationsQueries } from './useStoreLocationsQueries'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const location = locationCollectionMock.spLocations?.items || []
describe('[hooks] useStoreLocationsQueries', () => {
  it('should return loactions with the filter by geo location', async () => {
    const { result, waitFor } = renderHook(
      () => useStoreLocationsQueries({ filter: 'geo near(87110,160934)' }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(location)
  })
})
