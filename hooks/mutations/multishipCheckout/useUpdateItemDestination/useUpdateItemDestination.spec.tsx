import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateItemDestination } from './useUpdateItemDestination'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateItemDestination', () => {
  it('should update checkout item destination', async () => {
    const { result } = renderHook(() => useUpdateItemDestination(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateCheckoutItemDestination.mutateAsync({
      checkoutId: '',
      itemId: '',
      destinationId: '',
    })

    await waitFor(() => {
      expect(result.current.updateCheckoutItemDestination.data).toEqual(checkoutMock.checkout)
    })
  })
})
