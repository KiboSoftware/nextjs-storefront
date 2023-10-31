import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteCurrentCart } from './useDeleteCurrentCart'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCurrentCart', () => {
  it('should use useDeleteCurrentCart when clear Cart', async () => {
    const { result } = renderHook(() => useDeleteCurrentCart(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteCurrentCart.mutateAsync()

    await waitFor(() => {
      expect(result.current.deleteCurrentCart.data).toEqual(true)
    })
  })
})
