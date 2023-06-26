import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateOrderCoupon } from './useUpdateOrderCoupon'
import { orderCouponMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderCoupon', () => {
  it('should use useUpdateOrderCoupon ', async () => {
    const { result } = renderHook(() => useUpdateOrderCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateOrderCoupon.mutateAsync({
      checkoutId: 'fskd657657',
      couponCode: '10OFF',
    })

    await waitFor(() => {
      expect(result.current.updateOrderCoupon.data).toStrictEqual(orderCouponMock.updateOrderCoupon)
    })
  })
})
