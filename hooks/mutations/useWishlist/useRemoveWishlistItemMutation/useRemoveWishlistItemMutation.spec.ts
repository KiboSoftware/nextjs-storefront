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
  it('should use useRemoveWishlistItemMutation', async () => {
    renderHook(
      async () => {
        const { removeWishlistItem } = useRemoveWishlistItemMutation()
        const response = await removeWishlistItem.mutateAsync(removeWishlistItemInput)

        expect(response).toBeTruthy()
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
