import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteCheckoutCoupon } from './useDeleteCheckoutCoupon'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCheckoutCoupon', () => {
  it('should remove deleted coupon', async () => {
    const { result } = renderHook(() => useDeleteCheckoutCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteCheckoutCoupon.mutateAsync({
      checkoutId: '43245kjg5j43543hj',
      couponCode: 'OFF10',
    })

    await waitFor(() => {
      expect(result.current.deleteCheckoutCoupon.data).toStrictEqual(checkoutMock)
    })
  })
})
