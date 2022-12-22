import { renderHook } from '@testing-library/react-hooks'

import { useSkipNextSubscriptionMutation } from './useSkipNextSubscriptionMutation'
import { subscriptionCollectionMock } from '@/__mocks__/stories/subscriptionCollectionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useSkipNextSubscriptionMutation', () => {
  it('should return subscription details when subscriptionID is passed', async () => {
    renderHook(
      async () => {
        const subscriptionId = '149ceaac15c2eb00016c498e000045a4'
        const skipNextSubscription = useSkipNextSubscriptionMutation()
        const response = await skipNextSubscription.mutateAsync(subscriptionId)
        expect(response).toStrictEqual(subscriptionCollectionMock.subscriptions)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
