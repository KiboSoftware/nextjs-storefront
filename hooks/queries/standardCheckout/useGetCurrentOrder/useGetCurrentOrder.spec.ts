import { renderHook } from '@testing-library/react-hooks'

import { useGetCurrentOrder } from './useGetCurrentOrder'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCurrentOrder', () => {
  it('should return checkout details when user provides valid checkoutId', async () => {
    const checkoutId = '137a979305c65d00010800230000678b'
    const { result, waitFor } = renderHook(() => useGetCurrentOrder({ checkoutId }), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(orderMock.checkout)
  })
})
