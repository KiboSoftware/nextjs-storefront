import { renderHook } from '@testing-library/react-hooks'

import { useRemoveCartItemMutation } from './useRemoveCartItemMutation'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useRemoveCartItemMutation', () => {
  it('should use useRemoveCartItemMutation when removeCartItem', async () => {
    renderHook(
      async () => {
        const { removeCartItem } = useRemoveCartItemMutation()
        const response = await removeCartItem.mutateAsync({
          cartItemId: 'fjsdhfjsdh53472bkjsdffdf',
        })
        expect(response).toEqual(true)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
