import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateSubscriptionNextOrderDate } from './useUpdateSubscriptionNextOrderDate'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateSubscriptionNextOrderDate', () => {
  it('should use useUpdateSubscriptionNextOrderDate', async () => {
    const params = {
      subscriptionId: '149ceaac15c2eb00016c498e000045a4',
      subscriptionNextOrderDateInput: {
        nextOrderDate: '05/06/2030',
      },
    }

    const { result } = renderHook(() => useUpdateSubscriptionNextOrderDate(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateSubscriptionNextOrderDate.mutateAsync(params)

    await waitFor(() => {
      expect(result.current.updateSubscriptionNextOrderDate.data).toStrictEqual(
        subscriptionMock.subscription.nextOrderDate
      )
    })
  })
})
