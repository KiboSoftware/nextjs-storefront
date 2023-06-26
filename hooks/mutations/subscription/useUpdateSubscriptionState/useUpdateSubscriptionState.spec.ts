import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateSubscriptionState } from './useUpdateSubscriptionState'
import { subscriptionMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateSubscriptionState', () => {
  it('should return subscription details when subscriptionID is passed', async () => {
    const params = {
      subscriptionId: '149ceaac15c2eb00016c498e000045a4',
      subscriptionActionInput: {
        actionName: 'Pause',
        reason: {
          actionName: 'Pause',
        },
      },
    }
    const { result } = renderHook(() => useUpdateSubscriptionState(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateSubscriptionState.mutateAsync(params)

    await waitFor(() => {
      expect(result.current.updateSubscriptionState.data).toStrictEqual(
        subscriptionMock.subscription
      )
    })
  })
})
