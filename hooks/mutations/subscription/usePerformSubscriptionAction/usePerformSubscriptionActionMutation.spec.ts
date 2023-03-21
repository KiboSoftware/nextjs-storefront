import { renderHook } from '@testing-library/react-hooks'

import { usePerformSubscriptionActionMutation } from './usePerformSubscriptionActionMutation'
import { subscriptionMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] usePerformSubscriptionActionMutation', () => {
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
    renderHook(
      async () => {
        const { performSubscriptionActionMutation } = usePerformSubscriptionActionMutation()
        const response = await performSubscriptionActionMutation.mutateAsync(params)
        expect(response).toStrictEqual(subscriptionMock.subscription)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
