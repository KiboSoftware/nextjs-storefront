import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateSubscriptionFrequency } from './useUpdateSubscriptionFrequency'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateSubscriptionFrequency', () => {
  it('should use useUpdateSubscriptionFrequency', async () => {
    const params = {
      subscriptionId: '149ceaac15c2eb00016c498e000045a4',
      frequencyInput: {
        value: 4,
        unit: 'Month',
      },
    }

    const { result } = renderHook(() => useUpdateSubscriptionFrequency(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateSubscriptionFrequency.mutateAsync(params)

    await waitFor(() => {
      expect(result.current.updateSubscriptionFrequency.data).toStrictEqual(
        subscriptionMock.subscription.frequency
      )
    })
  })
})
