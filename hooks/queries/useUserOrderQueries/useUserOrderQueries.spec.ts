import { renderHook } from '@testing-library/react-hooks'

import { useUserOrderQueries } from './useUserOrderQueries'
import { orderCollection } from '@/__mocks__/stories/orderCollection'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUserOrderQueries', () => {
  it('should return order collection when user provides valid order filters', async () => {
    const { result, waitFor } = renderHook(
      () => useUserOrderQueries({ filters: ['M-6'], isRefetching: true }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(orderCollection.orders)
  })
})
