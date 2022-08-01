import { waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useCreateWishlistMutation } from './useCreateWishlistMutation'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'
import { queryClient } from '@/lib/react-query/queryClient'

const mockWishlist = wishlistMock.items[0]

const customerAccountId = 1143

describe('[hooks] useCreateWishlistMutation', () => {
  afterEach(() => {
    queryClient.clear()
  })
  it('should use useCreateWishlistMutation', async () => {
    renderHook(
      async () => {
        const { createWishlist } = useCreateWishlistMutation()
        const response = await createWishlist.mutateAsync(customerAccountId)

        await waitFor(() => expect(response).toStrictEqual(mockWishlist?.items[0]))
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
