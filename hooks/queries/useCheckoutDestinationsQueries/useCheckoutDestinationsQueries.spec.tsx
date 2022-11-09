import { renderHook } from '@testing-library/react-hooks'

import { useCheckoutDestinationsQueries } from './useCheckoutDestinationsQueries'
import { checkoutDestinationsMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCheckoutDestinationsQueries', () => {
  it('should return checkout details when user provides valid checkoutId', async () => {
    const checkoutId = '137a979305c65d00010800230000678b'
    const { result, waitFor } = renderHook(() => useCheckoutDestinationsQueries({ checkoutId }), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(checkoutDestinationsMock.checkoutDestinations)
  })
})
