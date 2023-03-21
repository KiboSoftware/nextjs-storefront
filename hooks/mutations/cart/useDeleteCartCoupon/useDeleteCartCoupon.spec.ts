import { renderHook } from '@testing-library/react-hooks'

import { useDeleteCartCoupon } from './useDeleteCartCoupon'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCartCoupon', () => {
  it('should remove deleted coupon', async () => {
    renderHook(
      async () => {
        const deleteCartCoupon = useDeleteCartCoupon()
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
