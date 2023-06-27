import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateCheckoutCoupon } from './useUpdateCheckoutCoupon'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutCoupon', () => {
  it('should update the checkout coupon ', async () => {
    const { result } = renderHook(() => useUpdateCheckoutCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCheckoutCoupon.mutateAsync({
      checkoutId: 'fFG7657',
      couponCode: '11OFF',
    })

    await waitFor(() => {
      expect(result.current.updateCheckoutCoupon.data).toStrictEqual(checkoutMock)
    })
  })
})
