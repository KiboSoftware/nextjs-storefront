import { renderHook } from '@testing-library/react-hooks'

import { useDeleteCheckoutCouponMutation } from './useDeleteCheckoutCouponMutation'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCheckoutCouponMutation', () => {
  it('should remove deleted coupon', async () => {
    renderHook(
      async () => {
        const deleteCheckoutCoupon = useDeleteCheckoutCouponMutation()
        const variables = { checkoutId: '43245kjg5j43543hj', couponCode: 'OFF10' }
        const response = await deleteCheckoutCoupon.mutateAsync(variables)
        expect(response).toStrictEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
