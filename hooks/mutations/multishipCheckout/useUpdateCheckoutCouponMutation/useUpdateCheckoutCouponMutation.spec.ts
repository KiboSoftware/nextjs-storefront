import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutCouponMutation } from './useUpdateCheckoutCouponMutation'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutCouponMutation', () => {
  it('should use useUpdateCheckoutCouponMutation ', async () => {
    renderHook(
      async () => {
        const updateCheckoutCoupon = useUpdateCheckoutCouponMutation()
        const response = await updateCheckoutCoupon.mutateAsync({
          checkoutId: 'fFG7657',
          couponCode: '11OFF',
        })
        expect(response).toStrictEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
