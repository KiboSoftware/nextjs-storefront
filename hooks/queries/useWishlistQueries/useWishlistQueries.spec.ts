import { renderHook } from '@testing-library/react-hooks'

import { useWishlistQueries } from './useWishlistQueries'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useWishlistQueries', () => {
  it('should return current wishlists', async () => {
    const { result, waitFor } = renderHook(() => useWishlistQueries(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(wishlistMock?.items[0])
  })
})
