import { renderHook } from '@testing-library/react-hooks'

import { useCreateOrderMutation, OrderInfo } from './useCreateOrderMutation'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateOrderMutation', () => {
  it('should use useCreateOrderMutation', async () => {
    const orderInfo: OrderInfo = {
      orderId: '13d5570250a9e9000160a0180000678b',
      orderActionInput: {
        actionName: 'SubmitOrder',
      },
    }

    const expectedOrder = orderMock?.checkout

    renderHook(
      async () => {
        const createOrder = useCreateOrderMutation()
        const response = await createOrder.mutateAsync(orderInfo)

        expect(response).toEqual(expectedOrder)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
