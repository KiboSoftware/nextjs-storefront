import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateWishlistMutation } from './useUpdateWishlist'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

describe('[hooks] useUpdateWishlistMutation', () => {
  const { id, name, customerAccountId } = mockWishlist

  it('should update wishlist', async () => {
    const { result } = renderHook(() => useUpdateWishlistMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateWishlist.mutateAsync({
      wishlistId: id,
      wishlistInput: {
        name: name,
        customerAccountId,
        items: [],
      },
    })

    await waitFor(() => {
      expect(result.current.updateWishlist.data).toStrictEqual({
        id,
        name,
        customerAccountId,
        items: [],
      })
    })
  })

  it('should update wishlistItem', async () => {
    const { result } = renderHook(() => useUpdateWishlistMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateWishlistItemQuantity.mutateAsync({
      wishlistId: id,
      wishlistItemId: '62171e6cd0254c4bafb4b05100df8e1c',
      quantity: 10,
    })

    await waitFor(() => {
      expect(result.current.updateWishlistItemQuantity.data).toStrictEqual({
        id: '62171e6cd0254c4bafb4b05100df8e1c',
        quantity: 10,
      })
    })
  })
})
