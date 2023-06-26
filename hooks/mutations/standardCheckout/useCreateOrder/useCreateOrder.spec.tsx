import { renderHook, waitFor } from '@testing-library/react'

import { useCreateOrder } from './useCreateOrder'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateOrder', () => {
  it('should use useCreateOrder', async () => {
    const expectedOrder = orderMock?.checkout

    const { result } = renderHook(() => useCreateOrder(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createOrder.mutateAsync(expectedOrder)

    await waitFor(() => {
      expect(result.current.createOrder.data).toEqual(expectedOrder)
    })
  })
})
