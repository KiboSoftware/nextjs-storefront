import { renderHook } from '@testing-library/react-hooks'

import { usePurchaseLocation } from './usePurchaseLocation'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const location =
  (locationCollectionMock.spLocations?.items && locationCollectionMock.spLocations?.items[0]) || {}

jest.mock('@/lib/helpers/cookieHelper', () => ({
  decodeParseCookieValue: jest.fn(() => 'ALB'),
}))

describe('[hooks] usePurchaseLocation', () => {
  it('should return purchase loaction based on location code', async () => {
    const { result, waitFor } = renderHook(() => usePurchaseLocation(), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(location)
  })
})
