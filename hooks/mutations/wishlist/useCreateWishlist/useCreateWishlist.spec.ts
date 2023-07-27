import { renderHook, waitFor } from '@testing-library/react'

import { useCreateWishlist } from './useCreateWishlist'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

describe('[hooks] useCreateWishlist', () => {
  const { id, name, customerAccountId } = mockWishlist

  it('should create wishlist', async () => {
    const { result } = renderHook(() => useCreateWishlist(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createWishlist.mutateAsync(customerAccountId)

    await waitFor(() => {
      expect(result.current.createWishlist.data).toStrictEqual({
        id,
        name,
        customerAccountId,
        items: [],
      })
    })
  })

  it('should create custom wishlist', async () => {
    const { result } = renderHook(() => useCreateWishlist(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createWishlist.mutateAsync({ customerAccountId, items: [], name, id })

    await waitFor(() => {
      expect(result.current.createWishlist.data).toStrictEqual({
        id,
        name,
        customerAccountId,
        items: [],
      })
    })
  })
})
