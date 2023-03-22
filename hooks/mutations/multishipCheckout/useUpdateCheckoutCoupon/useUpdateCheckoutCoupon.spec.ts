import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutCoupon } from './useUpdateCheckoutCoupon'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutCoupon', () => {
  it('should update the checkout coupon ', async () => {
    renderHook(
      async () => {
        const updateCheckoutCoupon = useUpdateCheckoutCoupon()
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
