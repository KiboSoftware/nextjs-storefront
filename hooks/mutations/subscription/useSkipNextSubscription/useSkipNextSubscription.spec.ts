import { renderHook } from '@testing-library/react-hooks'

import { useSkipNextSubscription } from './useSkipNextSubscription'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useSkipNextSubscription', () => {
  it('should return subscription details when subscriptionID is passed', async () => {
    renderHook(
      async () => {
        const subscriptionId = '149ceaac15c2eb00016c498e000045a4'
        const { skipNextSubscription } = useSkipNextSubscription()
        const response = await skipNextSubscription.mutateAsync(subscriptionId)
        expect(response).toStrictEqual(subscriptionMock.subscription)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
