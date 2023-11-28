import { renderHook, waitFor } from '@testing-library/react'

import { useGetCustomerWishlist } from './useGetCustomerWishlist'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCustomerWishlist', () => {
  it('should return current wishlists', async () => {
    const { result } = renderHook(
      () => useGetCustomerWishlist({ customerAccountId: 1143, wishlistName: 'default-wishlist' }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(wishlistMock?.items[0])
    })
  })
})
