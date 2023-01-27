import { renderHook } from '@testing-library/react-hooks'

import { useOrderSubscriptionNowMutation } from './useOrderSubscriptionNowMutation'
import { orderSubscriptionNowMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useOrderSubscriptionNowMutation', () => {
  it('should use useOrderSubscriptionNowMutation', () => {
    renderHook(
      async () => {
        const { orderSubscriptionNow } = useOrderSubscriptionNowMutation()
        const response = await orderSubscriptionNow.mutateAsync({
          subscriptionId: '12345',
        })

        console.table(response)

        expect(response).toStrictEqual(orderSubscriptionNowMock.orderSubscriptionNow)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
