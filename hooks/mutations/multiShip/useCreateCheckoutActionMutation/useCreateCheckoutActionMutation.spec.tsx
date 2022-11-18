import { renderHook } from '@testing-library/react-hooks'

import { useCreateMultiShipOrderMutation } from './useCreateCheckoutActionMutation'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateMultiShipOrderMutation', () => {
  it('should use useCreateMultiShipOrderMutation', async () => {
    renderHook(
      async () => {
        const createMultiShipOrder = useCreateMultiShipOrderMutation()
        const response = await createMultiShipOrder.mutateAsync(checkoutMock)

        expect(response).toEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
