import { renderHook, waitFor } from '@testing-library/react'

import { useAddToWishlistItem } from './useAddToWishlistItem'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

const addToWishlistItemInput = {
  product: {
    productCode: 'MS-BTL-005',
    isPackagedStandAlone: true,
    variationProductCode: 'MS-BTL-005',
    options: [],
  },
  customerAccountId: 1143,
  currentWishlist: mockWishlist,
}

describe('[hooks] useAddToWishlistItem', () => {
  it('should add item to wishlist', async () => {
    const { result } = renderHook(() => useAddToWishlistItem(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addToWishlist.mutateAsync({
      ...addToWishlistItemInput,
      currentWishlist: mockWishlist,
    })

    await waitFor(() => {
      expect(result.current.addToWishlist.data).toStrictEqual(mockWishlist?.items[0])
    })
  })
})
