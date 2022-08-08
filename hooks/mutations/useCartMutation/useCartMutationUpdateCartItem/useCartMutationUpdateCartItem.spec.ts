import { renderHook } from '@testing-library/react-hooks'

import { useCartMutationUpdateCartItem } from './useCartMutationUpdateCartItem'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import type { CartItemInput } from '@/lib/gql/types'

describe('[hooks] useCartMutationUpdateCartItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useCartMutationUpdateCartItem for updateCartItem', async () => {
    renderHook(
      async () => {
        const { updateCartItem } = useCartMutationUpdateCartItem()

        const updateResponse = await updateCartItem.mutateAsync({
          cartItemId: '1beef214158842d7a305ae68009d4d4c',
          cartItemInput: cartItemMock as CartItemInput,
        })

        expect(updateResponse).toStrictEqual(cartItemMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
