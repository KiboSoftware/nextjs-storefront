import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteCartCoupon } from './useDeleteCartCoupon'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCartCoupon', () => {
  it('should remove deleted coupon', async () => {
    const { result } = renderHook(() => useDeleteCartCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteCartCoupon.mutateAsync({
      cartId: '43245kjg5j43543hj',
      couponCode: 'OFF10',
    })
    await waitFor(() => {
      expect(result.current.deleteCartCoupon.data).toStrictEqual('1234')
    })
  })
})
