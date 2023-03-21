import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCartItemMutation } from './useUpdateCartItemMutation'
import { cartItemMock } from '@/__mocks__/stories/cartItemMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

import type { CrCartItemInput } from '@/lib/gql/types'

describe('[hooks] useUpdateCartItemMutation', () => {
  it('should use useUpdateCartItemMutation for updateCartItem', async () => {
    renderHook(
      async () => {
        const { updateCartItem } = useUpdateCartItemMutation()

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
