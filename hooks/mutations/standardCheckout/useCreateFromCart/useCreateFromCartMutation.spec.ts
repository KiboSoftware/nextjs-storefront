import { renderHook } from '@testing-library/react-hooks'

import { useCreateFromCartMutation } from './useCreateFromCartMutation'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateFromCartMutation', () => {
  it('should return cart details when user provides valid cartId', async () => {
    renderHook(
      async () => {
        const cartId = '137a94b6402be000013718d80000678b'
        const { createFromCart } = useCreateFromCartMutation()
        const response = await createFromCart.mutateAsync(cartId)
        expect(response).toStrictEqual(orderMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
