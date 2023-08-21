import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteWishlist } from './useDeleteWishlist'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

describe('[hooks] useCreateWishlist', () => {
  const { id } = mockWishlist
  it('should delete b2b list', async () => {
    const { result } = renderHook(() => useDeleteWishlist(), {
      wrapper: createQueryClientWrapper(),
    })
    result.current.deleteWishlist.mutateAsync(id)
    await waitFor(() => {
      expect(result.current.deleteWishlist.data).toStrictEqual({
        deleteWishlist: true,
      })
    })
  })
})
