import { renderHook, waitFor } from '@testing-library/react'

import { useCreateCheckout } from './useCreateCheckout'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckout', () => {
  it('should use useCreateCheckout', async () => {
    const { result } = renderHook(() => useCreateCheckout(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createCheckout.mutateAsync(checkoutMock?.checkout)

    await waitFor(() => {
      expect(result.current.createCheckout.data).toEqual(checkoutMock)
    })
  })
})
