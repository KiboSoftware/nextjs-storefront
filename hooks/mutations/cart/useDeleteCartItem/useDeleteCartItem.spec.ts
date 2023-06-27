import { renderHook, act, waitFor } from '@testing-library/react'

import { useDeleteCartItem } from './useDeleteCartItem'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCartItem', () => {
  it('should use useDeleteCartItem when deleteCartItem', async () => {
    const { result } = renderHook(() => useDeleteCartItem(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteCartItem.mutateAsync({
      cartItemId: 'fjsdhfjsdh53472bkjsdffdf',
    })

    await waitFor(() => {
      expect(result.current.deleteCartItem.data).toEqual(true)
    })
  })
})
