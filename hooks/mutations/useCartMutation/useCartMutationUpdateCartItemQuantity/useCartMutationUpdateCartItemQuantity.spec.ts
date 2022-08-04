import { renderHook } from '@testing-library/react-hooks'

import { useCartMutationUpdateCartItemQuantity } from './useCartMutationUpdateCartItemQuantity'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCartMutationUpdateCartItemQuantity', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useCartMutationUpdateCartItemQuantity when updateCartItemQuantity', async () => {
    renderHook(
      async () => {
        const { updateCartItemQuantity } = useCartMutationUpdateCartItemQuantity()
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
