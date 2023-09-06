import { renderHook, waitFor } from '@testing-library/react'

import { useCreateQuoteFromCart } from './useCreateQuoteFromCart'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateQuoteFromCart', () => {
  it('should create quote based on cartId', async () => {
    const { result } = renderHook(() => useCreateQuoteFromCart(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createQuoteFromCart.mutateAsync({
      cartId: 'cart-id',
      updateMode: 'ApplyToDraft',
    })

    await waitFor(() =>
      expect(result.current.createQuoteFromCart.data).toStrictEqual(quoteMock?.items?.[0])
    )
  })
})
