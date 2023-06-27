import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateCartItem } from './useUpdateCartItem'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import type { CrCartItemInput } from '@/lib/gql/types'

describe('[hooks] useUpdateCartItem', () => {
  it('should use useUpdateCartItem for updateCartItem', async () => {
    const { result } = renderHook(() => useUpdateCartItem(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCartItem.mutate({
      cartItemId: '1beef214158842d7a305ae68009d4d4c',
      cartItemInput: cartItemMock as CrCartItemInput,
    })

    await waitFor(() => {
      expect(result.current.updateCartItem.data).toEqual(cartItemMock)
    })
  })
})
