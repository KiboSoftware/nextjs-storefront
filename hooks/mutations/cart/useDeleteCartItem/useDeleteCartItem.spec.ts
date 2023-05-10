import { renderHook } from '@testing-library/react-hooks'

import { useDeleteCartItem } from './useDeleteCartItem'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteCartItem', () => {
  it('should use useDeleteCartItem when deleteCartItem', async () => {
    renderHook(
      async () => {
        const { deleteCartItem } = useDeleteCartItem()
        const response = await deleteCartItem.mutateAsync({
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
