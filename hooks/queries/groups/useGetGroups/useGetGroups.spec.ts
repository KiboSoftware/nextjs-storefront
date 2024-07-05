import { renderHook, waitFor } from '@testing-library/react'

import { useGetGroups } from './useGetGroups'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const groupsList = [
  {
    accountId: 1100,
    code: 'manager',
    name: 'Manager',
    description: 'Manager',
  },
  {
    accountId: 1100,
    code: 'admin',
    name: 'Admin',
    description: 'admin',
  },
]

const mockFetch = jest.fn(() => {
  return {
    json: () => groupsList,
  }
}) as any

// Assign the mock fetch implementation to the global object
global.fetch = mockFetch

describe('[hooks] useGetGroups', () => {
  it('should use useGetGroups', async () => {
    const { result } = renderHook(() => useGetGroups(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.data).toEqual(groupsList)
    })
  })
})
