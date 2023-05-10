import { renderHook } from '@testing-library/react-hooks'

import { useGetCart } from './useGetCart'
import { createQueryClientWrapper } from '../../../../__test__/utils/renderWithQueryClient'
import { cartMock } from '@/__mocks__/stories/cartMock'

describe('[hooks] useUser', () => {
  it('should return cart ', async () => {
    const { result, waitFor } = renderHook(() => useGetCart({}), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(cartMock.currentCart)
    })
  })
})
