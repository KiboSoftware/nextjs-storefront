import { renderHook, waitFor } from '@testing-library/react'

import { useRemoveUserFromGroup } from './useRemoveUserFromGroup'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockFetch = jest.fn(() => {
  return {
    json: () => true,
  }
}) as any

// Assign the mock fetch implementation to the global object
global.fetch = mockFetch

describe('[hooks] useRemoveUserFromGroup', () => {
  it('should use useRemoveUserFromGroup', async () => {
    const param = {
      accountId: 1041,
      groupCode: 'director',
      userId: '92edae78199c45ed8c18d90a111b986c',
    }

    const { result } = renderHook(() => useRemoveUserFromGroup(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.removeUserFromGroup.mutateAsync({
      params: param,
    })

    await waitFor(() => {
      expect(result.current.removeUserFromGroup.data).toEqual(true)
    })
  })
})
