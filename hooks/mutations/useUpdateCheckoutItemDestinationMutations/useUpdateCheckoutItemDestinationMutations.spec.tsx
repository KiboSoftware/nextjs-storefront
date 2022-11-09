import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutItemDestinationMutations } from './useUpdateCheckoutItemDestinationMutations'
import { checkoutResponse } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutItemDestinationMutations', () => {
  it('should use useUpdateCheckoutItemDestinationMutations', async () => {
    const checkoutItemDestination = checkoutResponse

    renderHook(
      async () => {
        const updateCheckoutItemDestination = useUpdateCheckoutItemDestinationMutations()
        const response = await updateCheckoutItemDestination.mutateAsync({
          checkoutId: '',
          itemId: '',
          destinationId: '',
        })

        expect(response).toEqual(checkoutItemDestination)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
