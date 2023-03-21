import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCartItem } from './useUpdateCartItem'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import type { CrCartItemInput } from '@/lib/gql/types'

describe('[hooks] useUpdateCartItem', () => {
  it('should use useUpdateCartItem for updateCartItem', async () => {
    renderHook(
      async () => {
        const { updateCartItem } = useUpdateCartItem()

        const updateResponse = await updateCartItem.mutateAsync({
          cartItemId: '1beef214158842d7a305ae68009d4d4c',
          cartItemInput: cartItemMock as CrCartItemInput,
        })

        expect(updateResponse).toStrictEqual(cartItemMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
