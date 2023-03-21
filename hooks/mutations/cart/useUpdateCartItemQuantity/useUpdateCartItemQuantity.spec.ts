import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCartItemQuantity } from './useUpdateCartItemQuantity'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCartItemQuantity', () => {
  it('should use useUpdateCartItemQuantity when updateCartItemQuantity', async () => {
    renderHook(
      async () => {
        const { updateCartItemQuantity } = useUpdateCartItemQuantity()
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
