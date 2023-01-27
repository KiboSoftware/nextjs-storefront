import { renderHook } from '@testing-library/react-hooks'

import { useCreateWishlistMutation } from './useCreateWishlistMutation'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockWishlist = wishlistMock.items[0]

describe('[hooks] useCreateWishlistMutation', () => {
  const { id, name, customerAccountId } = mockWishlist

  it('should create wishlist', async () => {
    renderHook(
      async () => {
        const { createWishlist } = useCreateWishlistMutation()
        const response = await createWishlist.mutateAsync(customerAccountId)
        expect(response).toStrictEqual({ id, name, customerAccountId, items: [] })
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
