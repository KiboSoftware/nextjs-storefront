import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutDestinationMutations } from './useUpdateCheckoutDestinationMutations'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutDestinationMutations', () => {
  it('should use useUpdateCheckoutDestinationMutations', async () => {
    const checkoutDestination = checkoutDestinationsMock.checkoutDestinations[0]

    renderHook(
      async () => {
        const updateCheckoutDestination = useUpdateCheckoutDestinationMutations()
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
