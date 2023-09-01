import { renderHook, waitFor } from '@testing-library/react'

import { useInitiateOrder } from './useInitiateOrder'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useInitiateOrder', () => {
  it('should return cart details when user provides valid cartId', async () => {
    const { result } = renderHook(() => useInitiateOrder(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.initiateOrder.mutateAsync({ cartId: '137a94b6402be000013718d80000678b' })

    await waitFor(() => {
      expect(result.current.initiateOrder.data).toStrictEqual(orderMock.checkout)
    })
  })

  it('should return order details when user provides valid quoteId', async () => {
    const { result } = renderHook(() => useInitiateOrder(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.initiateOrder.mutateAsync({ quoteId: '137a94b6402be000013718d80000678b' })

    await waitFor(() => {
      expect(result.current.initiateOrder.data).toStrictEqual(orderMock.checkout)
    })
  })
})
