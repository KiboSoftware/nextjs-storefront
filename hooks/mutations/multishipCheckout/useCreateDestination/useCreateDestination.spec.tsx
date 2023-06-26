import { renderHook, waitFor } from '@testing-library/react'

import { useCreateDestination } from './useCreateDestination'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateDestination', () => {
  it('should create checkout destination', async () => {
    const checkoutDestination = checkoutDestinationsMock.checkoutDestinations[0]

    const { result } = renderHook(() => useCreateDestination(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createCheckoutDestination.mutateAsync({
      checkoutId: '',
      destinationInput: {},
    })

    await waitFor(() => {
      expect(result.current.createCheckoutDestination.data).toEqual(checkoutDestination)
    })
  })
})
