import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCartCouponMutation } from './useUpdateCartCouponMutation'
import { cartCouponMock } from '@/__mocks__/stories/cartMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCartCouponMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useUpdateCartCouponMutation ', async () => {
    renderHook(
      async () => {
        const updateCartCoupon = useUpdateCartCouponMutation()
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
