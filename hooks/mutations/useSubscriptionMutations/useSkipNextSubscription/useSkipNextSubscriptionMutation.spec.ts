import { renderHook } from '@testing-library/react-hooks'

import { useSkipNextSubscriptionMutation } from './useSkipNextSubscriptionMutation'
import { subscriptionResponse } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useSkipNextSubscriptionMutation', () => {
  it('should return subscription details when subscriptionID is passed', async () => {
    renderHook(
      async () => {
        const subscriptionId = '1488b95b3611b0000177db6a000074e7'
        const skipNextSubscription = useSkipNextSubscriptionMutation()
        const response = await skipNextSubscription.mutateAsync(subscriptionId)
        expect(response).toStrictEqual(subscriptionResponse.subscription)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
