import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateOrderPersonalInfo } from './useUpdateOrderPersonalInfo'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderPersonalInfo', () => {
  it('should use useUpdateOrderPersonalInfo', async () => {
    const checkoutDetails = {
      checkout: orderMock.checkout,
      email: 'amol23@kibo.com',
    }

    const { result } = renderHook(() => useUpdateOrderPersonalInfo(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateOrderPersonalInfo.mutateAsync(checkoutDetails)

    await waitFor(() => {
      expect(result.current.updateOrderPersonalInfo.data).toStrictEqual(orderMock.checkout)
    })
  })
})
