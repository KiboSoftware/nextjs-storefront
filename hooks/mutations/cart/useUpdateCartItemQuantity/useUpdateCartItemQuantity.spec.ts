import { renderHook, act, waitFor } from '@testing-library/react'

import { useUpdateCartItemQuantity } from './useUpdateCartItemQuantity'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCartItemQuantity', () => {
  it('should use useUpdateCartItemQuantity when updateCartItemQuantity', async () => {
    const { result } = renderHook(() => useUpdateCartItemQuantity(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCartItemQuantity.mutate({
      cartItemId: 'fjsdhfjsdh53472bkjsdffdf',
      quantity: 2,
    })

    await waitFor(() => {
      expect(result.current.updateCartItemQuantity.data).toEqual(cartItemMock)
    })
  })
})
