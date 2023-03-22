import { renderHook } from '@testing-library/react-hooks'

import { useUpdateDestination } from './useUpdateDestination'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateDestination', () => {
  it('should update checkout destination', async () => {
    const checkoutDestination = checkoutDestinationsMock.checkoutDestinations[0]

    renderHook(
      async () => {
        const updateCheckoutDestination = useUpdateDestination()
        const response = await updateCheckoutDestination.mutateAsync({
          checkoutId: '',
          destinationId: '',
          destinationInput: {},
        })

        expect(response).toEqual(checkoutDestination)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
