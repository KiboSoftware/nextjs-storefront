import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteSubscriptionMutation } from './useDeleteSubscription'
import { subscriptionMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useDeleteSubscriptionMutation', () => {
  it('should return subscription details when subscriptionID is passed', async () => {
    const params = {
      subscriptionId: '149ceaac15c2eb00016c498e000045a4',
      subscriptionItemId: '1234',
      subscriptionReasonInput: {
        actionName: 'cancel',
        reasonCode: 'cancel',
        description: 'cancel',
        moreInfo: 'cancel',
      },
    }
    const { result } = renderHook(() => useDeleteSubscriptionMutation(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteSubscription.mutateAsync(params)

    await waitFor(() => {
      expect(result.current.deleteSubscription.data).toStrictEqual(subscriptionMock.subscription)
    })
  })
})
