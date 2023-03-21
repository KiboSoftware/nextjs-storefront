import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCartCoupon } from './useUpdateCartCoupon'
import { cartCouponMock } from '@/__mocks__/stories/cartMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCartCoupon', () => {
  it('should use useUpdateCartCoupon ', async () => {
    renderHook(
      async () => {
        const updateCartCoupon = useUpdateCartCoupon()
        const response = await updateCartCoupon.mutateAsync({
          cartId: 'fjsdhfjsdh53472bkjsdffdf',
          couponCode: '10OFF',
        })
        expect(response).toStrictEqual(cartCouponMock.updateCartCoupon)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
