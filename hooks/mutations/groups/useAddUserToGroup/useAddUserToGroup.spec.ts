import { renderHook, waitFor } from '@testing-library/react'

import { useAddUserToGroup } from './useAddUserToGroup'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockFetch = jest.fn(() => {
  return {
    json: () => true,
  }
}) as any

// Assign the mock fetch implementation to the global object
global.fetch = mockFetch

describe('[hooks] useAddUserToGroup', () => {
  it('should use useAddUserToGroup', async () => {
    const { result } = renderHook(() => useAddUserToGroup(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.addUserToGroup.mutateAsync({
      accountId: 1041,
      groupCode: 'director',
      userId: '92edae78199c45ed8c18d90a111b986c',
    })

    await waitFor(() => {
      expect(result.current.addUserToGroup.data).toEqual(true)
    })
  })
})
