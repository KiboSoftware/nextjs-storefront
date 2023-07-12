import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateUserOrder } from './useUpdateUserOrder'
import { orderMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useUpdateForgottenPassword', () => {
  it('should use useUpdateUserOrder to update checkout object', async () => {
    const { result } = renderHook(() => useUpdateUserOrder(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateUserOrder.mutateAsync('mock-order-id')
    await waitFor(() => {
      expect(result.current.updateUserOrder.data).toStrictEqual(orderMock.checkout)
    })
  })
})
