import { renderHook } from '@testing-library/react-hooks'

import { useCreateCheckout } from './useCreateCheckout'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckout', () => {
  it('should use useCreateCheckout', async () => {
    renderHook(
      async () => {
        const createMultiShipCheckout = useCreateCheckout()
        const response = await createMultiShipCheckout.mutateAsync(checkoutMock?.checkout)

        expect(response).toEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
