import { renderHook } from '@testing-library/react-hooks'

import { useUpdateCheckoutItemDestinationMutations } from './useUpdateCheckoutItemDestinationMutations'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateCheckoutItemDestinationMutations', () => {
  it('should use useUpdateCheckoutItemDestinationMutations', async () => {
    renderHook(
      async () => {
        const updateCheckoutItemDestination = useUpdateCheckoutItemDestinationMutations()
        const response = await updateCheckoutItemDestination.mutateAsync({
          checkoutId: '',
          itemId: '',
          destinationId: '',
        })

        expect(response).toEqual(checkoutMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
