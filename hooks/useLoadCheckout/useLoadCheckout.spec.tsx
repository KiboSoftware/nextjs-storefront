import { renderHook } from '@testing-library/react-hooks'

import { orderMock } from '../../__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '../../__test__/utils/renderWithQueryClient'
import { useLoadCheckout, useLoadFromCart } from '../useLoadCheckout/useLoadCheckout'

describe('[hooks] useLoadCheckout', () => {
  it('should use useLoadCheckout', async () => {
    const { result, waitFor } = renderHook(() => useLoadCheckout('checkoutId'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toBe(orderMock)
  })

  it('should use useLoadFromCart', async () => {
    const { result, waitFor } = renderHook(() => useLoadFromCart('cartId'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toBe(orderMock)
  })
})
