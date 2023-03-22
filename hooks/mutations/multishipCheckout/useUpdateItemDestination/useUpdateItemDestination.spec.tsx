import { renderHook } from '@testing-library/react-hooks'

import { useUpdateItemDestination } from './useUpdateItemDestination'
import { checkoutMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateItemDestination', () => {
  it('should update checkout item destination', async () => {
    renderHook(
      async () => {
        const updateCheckoutItemDestination = useUpdateItemDestination()
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
