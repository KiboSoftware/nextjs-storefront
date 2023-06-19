import { renderHook, waitFor } from '@testing-library/react'

import { useGetCustomerOrders } from './useGetCustomerOrders'
import { orderCollection } from '@/__mocks__/stories/orderCollection'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCustomerOrders', () => {
  it('should return order collection when user provides valid order filters', async () => {
    const { result } = renderHook(
      () => useGetCustomerOrders({ filters: ['M-6'], isRefetching: true }),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => expect(result.current.data).toStrictEqual(orderCollection.orders))
  })
})
