import { renderHook } from '@testing-library/react-hooks'

import { useCreateDestination } from './useCreateDestination'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateDestination', () => {
  it('should create checkout destination', async () => {
    const checkoutDestination = checkoutDestinationsMock.checkoutDestinations[0]

    renderHook(
      async () => {
        const createCheckoutDestination = useCreateDestination()
        const response = await createCheckoutDestination.mutateAsync({
          checkoutId: '',
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
