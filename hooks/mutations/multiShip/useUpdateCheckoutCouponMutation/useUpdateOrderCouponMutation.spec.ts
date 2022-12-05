import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutCouponMutation } from './useUpdateCheckoutCouponMutation'
import { checkoutCouponMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] updateCheckoutCouponMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use updateCheckoutCouponMutation ', async () => {
    renderHook(
      async () => {
        const updateCheckoutCoupon = useUpdateCheckoutCouponMutation()
        const response = await updateCheckoutCoupon.mutateAsync({
          checkoutId: 'fskd657657',
          couponCode: '10OFF',
        })
        expect(response).toStrictEqual(checkoutCouponMock.updateCheckoutCoupon)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
