import { renderHook } from '@testing-library/react-hooks'

import { useCreateCheckoutDestinationMutations } from './useCreateCheckoutDestinationMutations'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckoutDestinationMutations', () => {
  it('should use useCreateCheckoutDestinationMutations', async () => {
    const checkoutDestination = checkoutDestinationsMock.checkoutDestinations[0]

    renderHook(
      async () => {
        const createCheckoutDestination = useCreateCheckoutDestinationMutations()
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
