import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCartItemQuantityMutation } from './useUpdateCartItemQuantityMutation'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCartItemQuantityMutation', () => {
  it('should use useUpdateCartItemQuantityMutation when updateCartItemQuantity', async () => {
    renderHook(
      async () => {
        const { updateCartItemQuantity } = useUpdateCartItemQuantityMutation()
        const response = await updateCartItemQuantity.mutateAsync({
          cartItemId: 'fjsdhfjsdh53472bkjsdffdf',
          quantity: 2,
        })
        expect(response).toStrictEqual(cartItemMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
