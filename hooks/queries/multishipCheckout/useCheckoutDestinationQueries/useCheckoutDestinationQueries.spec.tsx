import { renderHook } from '@testing-library/react-hooks'

import { useCheckoutDestinationQueries } from './useCheckoutDestinationQueries'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCheckoutDestinationQueries', () => {
  it('should return checkout details when user provides valid checkoutId', async () => {
    const checkoutId = '137a979305c65d00010800230000678b'
    const { result, waitFor } = renderHook(
      () => useCheckoutDestinationQueries({ checkoutId, destinationId: '' }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(checkoutDestinationsMock.checkoutDestinations[0])
  })
})
