import { renderHook, waitFor } from '@testing-library/react'

import { useGetWishlist } from './useGetWishlist'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetWishlist', () => {
  it('should return current wishlists', async () => {
    const { result } = renderHook(() => useGetWishlist(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.data).toStrictEqual(wishlistMock?.items[0]))
  })
})
