import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateDestination } from './useUpdateDestination'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateDestination', () => {
  it('should update checkout destination', async () => {
    const checkoutDestination = checkoutDestinationsMock.checkoutDestinations[0]

    const { result } = renderHook(() => useUpdateDestination(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCheckoutDestination.mutateAsync({
      checkoutId: '',
      destinationId: '',
      destinationInput: {},
    })

    await waitFor(() => {
      expect(result.current.updateCheckoutDestination.data).toEqual(checkoutDestination)
    })
  })
})
