import { renderHook } from '@testing-library/react-hooks'

import { useCurrentLocation } from './useCurrentLocation'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCurrentLocation', () => {
  it('should return search loactions when entered search term', async () => {
    const { result } = renderHook(() => useCurrentLocation(), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.currentLocation).toEqual('')
  })
})
