import { renderHook } from '@testing-library/react-hooks'

import { useUpdateOrderCouponMutation } from './useUpdateOrderCouponMutation'
import { orderCouponMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateOrderCouponMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useUpdateOrderCouponMutation ', async () => {
    renderHook(
      async () => {
        const updateOrderCoupon = useUpdateOrderCouponMutation()
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
