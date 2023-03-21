import { renderHook } from '@testing-library/react-hooks'

import { useDeleteCartCouponMutation } from './useDeleteCartCouponMutation'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCartCouponMutation', () => {
  it('should remove deleted coupon', async () => {
    renderHook(
      async () => {
        const deleteCartCoupon = useDeleteCartCouponMutation()
        const variables = { cartId: '43245kjg5j43543hj', couponCode: 'OFF10' }
        const response = await deleteCartCoupon.mutateAsync(variables)
        expect(response).toStrictEqual('1234')
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
