import { renderHook, waitFor } from '@testing-library/react'

import { useCreateOrderReturn } from './useCreateOrderReturn'
import { createReturnMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateOrderReturn', () => {
  it('should use useCreateOrderReturn', async () => {
    const expectedReturn = createReturnMock?.createReturn

    const { result } = renderHook(() => useCreateOrderReturn(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createReturnItems.mutateAsync({
      returnType: 'Replace',
      reason: 'Damaged',
      originalOrderId: '',
      items: [],
      locationCode: '',
    })

    await waitFor(() => {
      expect(result.current.createReturnItems.data).toEqual(expectedReturn)
    })
  })
})
