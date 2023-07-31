import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateWishlistMutation } from './useUpdateWishlist'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

describe('[hooks] useUpdateWishlistMutation', () => {
  const { id, name, customerAccountId } = mockWishlist

  it('should create custom wishlist', async () => {
    const { result } = renderHook(() => useUpdateWishlistMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateWishlist.mutateAsync({ customerAccountId, items: [], name, id })

    await waitFor(() => {
      expect(result.current.updateWishlist.data).toStrictEqual({
        id,
        name,
        customerAccountId,
        items: [],
      })
    })
  })
})
