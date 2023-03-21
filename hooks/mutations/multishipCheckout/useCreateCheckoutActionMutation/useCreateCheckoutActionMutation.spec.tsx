import { renderHook } from '@testing-library/react-hooks'

import { useCreateMultiShipCheckoutMutation } from './useCreateCheckoutActionMutation'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateMultiShipCheckoutMutation', () => {
  it('should use useCreateMultiShipCheckoutMutation', async () => {
    renderHook(
      async () => {
        const createMultiShipCheckout = useCreateMultiShipCheckoutMutation()
        const response = await createMultiShipCheckout.mutateAsync(checkoutMock?.checkout)

        expect(response).toEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
