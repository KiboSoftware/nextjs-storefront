import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteOrderCoupon } from './useDeleteOrderCoupon'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteOrderCoupon', () => {
  it('should remove deleted coupon', async () => {
    const { result } = renderHook(() => useDeleteOrderCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteOrderCoupon.mutateAsync({
      checkoutId: '43245kjg5j43543hj',
      couponCode: 'OFF10',
    })

    await waitFor(() => {
      expect(result.current.deleteOrderCoupon.data).toStrictEqual('1234')
    })
  })
})
