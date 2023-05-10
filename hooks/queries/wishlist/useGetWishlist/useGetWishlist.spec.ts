import { renderHook } from '@testing-library/react-hooks'

import { useGetWishlist } from './useGetWishlist'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetWishlist', () => {
  it('should return current wishlists', async () => {
    const { result, waitFor } = renderHook(() => useGetWishlist(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(wishlistMock?.items[0])
  })
})
