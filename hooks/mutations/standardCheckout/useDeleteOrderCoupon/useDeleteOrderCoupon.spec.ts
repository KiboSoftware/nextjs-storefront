import { renderHook } from '@testing-library/react-hooks'

import { useDeleteOrderCoupon } from './useDeleteOrderCoupon'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteOrderCoupon', () => {
  it('should remove deleted coupon', async () => {
    renderHook(
      async () => {
        const deleteOrderCoupon = useDeleteOrderCoupon()
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
