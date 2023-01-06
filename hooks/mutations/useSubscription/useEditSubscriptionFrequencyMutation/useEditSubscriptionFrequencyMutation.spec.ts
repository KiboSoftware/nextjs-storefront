import { renderHook } from '@testing-library/react-hooks'

import { useEditSubscriptionFrequencyMutation } from './useEditSubscriptionFrequencyMutation'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useEditSubscriptionFrequencyMutation', () => {
  it('should use useEditSubscriptionFrequencyMutation', async () => {
    const params = {
      subscriptionId: '149ceaac15c2eb00016c498e000045a4',
      frequencyInput: {
        value: 4,
        unit: 'Month',
      },
    }

    renderHook(
      async () => {
        const useEditSubscriptionFrequency = useEditSubscriptionFrequencyMutation()
        const response = await useEditSubscriptionFrequency.mutateAsync(params)

        expect(response).toStrictEqual(subscriptionMock.updateSubscriptionFrequency.frequency)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
