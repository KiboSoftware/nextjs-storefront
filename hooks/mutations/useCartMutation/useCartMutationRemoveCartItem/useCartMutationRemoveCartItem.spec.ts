import { renderHook } from '@testing-library/react-hooks'

import { useCartMutationRemoveCartItem } from './useCartMutationRemoveCartItem'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCartMutationRemoveCartItem', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use useCartMutationRemoveCartItem when removeCartItem', async () => {
    renderHook(
      async () => {
        const { removeCartItem } = useCartMutationRemoveCartItem()
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
