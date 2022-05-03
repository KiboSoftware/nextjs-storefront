import { renderHook } from '@testing-library/react-hooks'

import { useLoadCheckout, useLoadFromCart } from '..'
import { mockCheckout } from '../../__mocks__/msw/mockData'
import { createQueryClientWrapper } from '../../__test__/utils/renderWithQueryClient'

describe('[hooks] useLoadCheckout', () => {
  it('should use useLoadCheckout', async () => {
    const { result, waitFor } = renderHook(() => useLoadCheckout('checkoutId'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toBe(mockCheckout)
  })

  it('should use useLoadFromCart', async () => {
    const { result, waitFor } = renderHook(() => useLoadFromCart('cartId'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toBe(mockCheckout)
  })
})
