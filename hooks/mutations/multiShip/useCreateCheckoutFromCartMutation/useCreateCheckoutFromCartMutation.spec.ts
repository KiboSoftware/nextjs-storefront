import { renderHook } from '@testing-library/react-hooks'

import { useCreateMultiShipCheckoutFromCartMutation } from './useCreateCheckoutFromCartMutation'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckoutFromCartMutation', () => {
  it('should return cart details when user provides valid cartId', async () => {
    renderHook(
      async () => {
        const cartId = '137a94b6402be000013718d80000678b'
        const { createMultiShipCheckoutFromCart } = useCreateMultiShipCheckoutFromCartMutation()
        const response = await createMultiShipCheckoutFromCart.mutateAsync(cartId)
        expect(response).toStrictEqual(orderMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
