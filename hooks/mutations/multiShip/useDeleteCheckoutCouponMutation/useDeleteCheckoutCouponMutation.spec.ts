import { renderHook } from '@testing-library/react-hooks'

import { useDeleteCheckoutCouponMutation } from './useDeleteCheckoutCouponMutation'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutCouponMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useUpdateCheckoutCouponMutation ', async () => {
    renderHook(
      async () => {
        const updateCheckoutCoupon = useDeleteCheckoutCouponMutation()
        const response = await updateCheckoutCoupon.mutateAsync({
          checkoutId: 'fskd657657',
          couponCode: '10OFF',
        })
        expect(response).toStrictEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
