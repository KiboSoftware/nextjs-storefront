import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateCartCoupon } from './useUpdateCartCoupon'
import { cartCouponMock } from '@/__mocks__/stories/cartMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCartCoupon', () => {
  it('should use useUpdateCartCoupon ', async () => {
    const { result } = renderHook(() => useUpdateCartCoupon(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCartCoupon.mutateAsync({
      cartId: 'fjsdhfjsdh53472bkjsdffdf',
      couponCode: '10OFF',
    })

    await waitFor(() => {
      expect(result.current.updateCartCoupon.data).toStrictEqual(cartCouponMock.updateCartCoupon)
    })
  })
})
