import { renderHook } from '@testing-library/react-hooks'

import { useOrderSubscriptionNow } from './useOrderSubscriptionNow'
import { orderSubscriptionNowMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useOrderSubscriptionNow', () => {
  it('should use useOrderSubscriptionNow', () => {
    renderHook(
      async () => {
        const { orderSubscriptionNow } = useOrderSubscriptionNow()
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
