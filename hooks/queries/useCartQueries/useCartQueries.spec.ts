import { renderHook } from '@testing-library/react-hooks'

import { createQueryClientWrapper } from '../../../__test__/utils/renderWithQueryClient'
import { useCartQueries } from './useCartQueries'
import { cartMock } from '@/__mocks__/stories/cartMock'

describe('[hooks] useUser', () => {
  it('should return cart ', async () => {
    const { result, waitFor } = renderHook(() => useCartQueries({}), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(cartMock.currentCart)
    })
  })
})
