import { renderHook } from '@testing-library/react-hooks'

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

    renderHook(
      async () => {
        const { updateSubscriptionNextOrderDate } = useUpdateSubscriptionNextOrderDate()
        const response = await updateSubscriptionNextOrderDate.mutateAsync(params)

        expect(response).toStrictEqual(subscriptionMock.subscription.nextOrderDate)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
