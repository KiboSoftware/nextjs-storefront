import { renderHook } from '@testing-library/react-hooks'

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

    renderHook(
      async () => {
        const { updateSubscriptionFrequency } = useUpdateSubscriptionFrequency()
        const response = await updateSubscriptionFrequency.mutateAsync(params)

        expect(response).toStrictEqual(subscriptionMock.subscription.frequency)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
