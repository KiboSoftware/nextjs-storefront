import { renderHook } from '@testing-library/react-hooks'

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
    renderHook(
      async () => {
        const { addToWishlist } = useAddToWishlistItem()
        const response = await addToWishlist.mutateAsync({
          ...addToWishlistItemInput,
          currentWishlist: mockWishlist,
        })

        expect(response).toStrictEqual(mockWishlist?.items[0])
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
