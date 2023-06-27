import { renderHook, waitFor } from '@testing-library/react'

import { useOrderSubscriptionNow } from './useOrderSubscriptionNow'
import { orderSubscriptionNowMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useOrderSubscriptionNow', () => {
  it('should use useOrderSubscriptionNow', async () => {
    const { result } = renderHook(() => useOrderSubscriptionNow(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.orderSubscriptionNow.mutateAsync({
      subscriptionId: '12345',
    })

    await waitFor(() => {
      expect(result.current.orderSubscriptionNow.data).toStrictEqual(
        orderSubscriptionNowMock.orderSubscriptionNow
      )
    })
  })
})
