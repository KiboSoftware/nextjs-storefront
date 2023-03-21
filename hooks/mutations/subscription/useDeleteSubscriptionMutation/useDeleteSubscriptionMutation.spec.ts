import { renderHook } from '@testing-library/react-hooks'

import { useDeleteSubscriptionMutation } from './useDeleteSubscriptionMutation'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'
import { subscriptionMock } from '@/__mocks__/stories'

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
    renderHook(
      async () => {
        const { deleteSubscription } = useDeleteSubscriptionMutation()
        const response = await deleteSubscription.mutateAsync(params)
        expect(response).toStrictEqual(subscriptionMock.subscription)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
