import { renderHook } from '@testing-library/react-hooks'

import { useCreateOrder } from './useCreateOrder'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateOrder', () => {
  it('should use useCreateOrder', async () => {
    const expectedOrder = orderMock?.checkout

    renderHook(
      async () => {
        const createOrder = useCreateOrder()
        const response = await createOrder.mutateAsync(expectedOrder)

        expect(response).toEqual(expectedOrder)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
