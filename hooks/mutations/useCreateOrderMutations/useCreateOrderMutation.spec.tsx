import { renderHook } from '@testing-library/react-hooks'

import { useCreateOrderMutation } from './useCreateOrderMutation'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateOrderMutation', () => {
  it('should use useCreateOrderMutation', async () => {
    const expectedOrder = orderMock?.checkout

    renderHook(
      async () => {
        const createOrder = useCreateOrderMutation()
        const response = await createOrder.mutateAsync(expectedOrder)

        expect(response).toEqual(expectedOrder)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
