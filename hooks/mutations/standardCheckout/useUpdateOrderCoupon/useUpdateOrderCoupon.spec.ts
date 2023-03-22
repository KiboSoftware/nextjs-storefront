import { renderHook } from '@testing-library/react-hooks'

import { useUpdateOrderCoupon } from './useUpdateOrderCoupon'
import { orderCouponMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderCoupon', () => {
  it('should use useUpdateOrderCoupon ', async () => {
    renderHook(
      async () => {
        const updateOrderCoupon = useUpdateOrderCoupon()
        const response = await updateOrderCoupon.mutateAsync({
          checkoutId: 'fskd657657',
          couponCode: '10OFF',
        })
        expect(response).toStrictEqual(orderCouponMock.updateOrderCoupon)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
