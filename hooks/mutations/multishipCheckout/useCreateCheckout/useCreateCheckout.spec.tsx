import { renderHook } from '@testing-library/react'

import { useCreateCheckout } from './useCreateCheckout'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckout', () => {
  it('should use useCreateCheckout', async () => {
    renderHook(
      async () => {
        const { createCheckout } = useCreateCheckout()
        const response = await createCheckout.mutateAsync(checkoutMock?.checkout)

        expect(response).toEqual(checkoutMock)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
