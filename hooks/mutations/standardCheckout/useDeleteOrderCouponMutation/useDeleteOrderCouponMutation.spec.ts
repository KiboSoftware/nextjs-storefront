import { renderHook } from '@testing-library/react-hooks'

import { useDeleteOrderCouponMutation } from './useDeleteOrderCouponMutation'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteOrderCouponMutation', () => {
  it('should remove deleted coupon', async () => {
    renderHook(
      async () => {
        const deleteOrderCoupon = useDeleteOrderCouponMutation()
        const variables = { checkoutId: '43245kjg5j43543hj', couponCode: 'OFF10' }
        const response = await deleteOrderCoupon.mutateAsync(variables)
        expect(response).toStrictEqual('1234')
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
