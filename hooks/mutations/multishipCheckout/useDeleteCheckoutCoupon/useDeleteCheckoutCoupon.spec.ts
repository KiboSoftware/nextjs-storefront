import { renderHook } from '@testing-library/react-hooks'

import { useDeleteCheckoutCoupon } from './useDeleteCheckoutCoupon'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCheckoutCoupon', () => {
  it('should remove deleted coupon', async () => {
    renderHook(
      async () => {
        const deleteCheckoutCoupon = useDeleteCheckoutCoupon()
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
