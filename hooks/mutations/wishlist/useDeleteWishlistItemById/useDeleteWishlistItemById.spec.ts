import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteWishlistItemById } from './useDeleteWishlistItemById'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteWishlistItem', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should remove wishlist item from wishlist page', async () => {
    const { result } = renderHook(
      () =>
        useDeleteWishlistItemById({ isRemovedFromWishlist: true, delay: 1000, isCreateList: true }),
      { wrapper: createQueryClientWrapper() }
    )

    result.current.deleteWishlistItemById.mutateAsync({
      wishlistId: '1144',
      wishlistItemId: '1abc11d',
    })

    await waitFor(() => {
      expect(result.current.deleteWishlistItemById.data).toBe(true)
    })
  })
})
