import { renderHook } from '@testing-library/react-hooks'

import { useRemoveWishlistItemMutation } from './useRemoveWishlistItemMutation'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

const removeWishlistItemInput = {
  product: {
    productCode: 'MS-BTL-005',
    isPackagedStandAlone: true,
    variationProductCode: 'MS-BTL-005',
    options: [],
  },
  currentWishlist: mockWishlist,
}

describe('[hooks] useRemoveWishlistItemMutation', () => {
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
      () => useRemoveWishlistItemMutation({ isRemovedFromWishlist: true, delay: 1000 }),
      { wrapper: createQueryClientWrapper() }
    )
    const response = await result.current.removeWishlistItem.mutateAsync(removeWishlistItemInput)
    expect(response).toBeTruthy()
  })
})
