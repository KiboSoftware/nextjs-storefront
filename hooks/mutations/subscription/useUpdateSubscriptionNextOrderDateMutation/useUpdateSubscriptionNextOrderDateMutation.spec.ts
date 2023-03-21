import { renderHook } from '@testing-library/react-hooks'

import { useUpdateSubscriptionNextOrderDateMutation } from './useUpdateSubscriptionNextOrderDateMutation'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateSubscriptionNextOrderDateMutation', () => {
  it('should use useUpdateSubscriptionNextOrderDateMutation', async () => {
    const params = {
      subscriptionId: '149ceaac15c2eb00016c498e000045a4',
      subscriptionNextOrderDateInput: {
        nextOrderDate: '05/06/2030',
      },
    }

    renderHook(
      async () => {
        const { updateSubscriptionNextOrderDateMutation } =
          useUpdateSubscriptionNextOrderDateMutation()
        const response = await updateSubscriptionNextOrderDateMutation.mutateAsync(params)

        expect(response).toStrictEqual(subscriptionMock.subscription.nextOrderDate)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
