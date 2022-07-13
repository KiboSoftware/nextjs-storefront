import { renderHook } from '@testing-library/react-hooks'
import * as cookienext from 'cookies-next'

import { setPurchaseLocation, usePurchaseLocation } from './usePurchaseLocation'
import { locationCollectionMock } from '@/__mocks__/stories/locationCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const location =
  (locationCollectionMock.spLocations?.items && locationCollectionMock.spLocations?.items[0]) || {}

jest.mock('@/lib/helpers/cookieHelper', () => ({
  decodeParseCookieValue: jest.fn(() => 'ALB'),
  prepareSetCookieValue: jest.fn(),
}))

describe('[hooks] usePurchaseLocation', () => {
  it('should return purchase loaction based on location code', async () => {
    const { result, waitFor } = renderHook(() => usePurchaseLocation(), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toEqual(location)
  })

  it('should set or delete purchase location based on location code', async () => {
    const mockDeleteCookie = jest.spyOn(cookienext, 'deleteCookie')
    const mockSetCookie = jest.spyOn(cookienext, 'setCookie')
    setPurchaseLocation('ALB')
    expect(mockSetCookie).toHaveBeenCalled()
    setPurchaseLocation(null)
    expect(mockDeleteCookie).toHaveBeenCalled()
  })
})
