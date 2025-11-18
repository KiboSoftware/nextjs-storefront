import { renderHook, waitFor } from '@testing-library/react'

import { useUpdateRoleAsync } from './useUpdateRoleAsync'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

const mockRequestRef = { current: jest.fn() }

jest.mock('@/lib/gql/client', () => ({
  makeGraphQLClient: jest.fn(() => ({
    request: (...args: unknown[]) => mockRequestRef.current(...args),
  })),
  makeGraphQLClientWithoutUserClaims: jest.fn(() => ({
    request: (...args: unknown[]) => mockRequestRef.current(...args),
  })),
}))

const mockRequest = mockRequestRef.current

describe('[hooks] useUpdateRoleAsync', () => {
  const mockRoleId = 5
  const mockRoleInput = {
    name: 'Updated Role Name',
    isSystemRole: false,
    behaviors: [1, 2, 3, 5, 7, 9],
    accountIds: [1001, 1002],
  }

  const mockRoleResponse = {
    id: 5,
    name: 'Updated Role Name',
    isSystemRole: false,
    behaviors: [1, 2, 3, 5, 7, 9],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.updateRole.status).toBe('idle')
  })

  it('should call updateRoleAsync mutation with correct parameters', async () => {
    mockRequest.mockResolvedValue({
      updateRoleAsync: mockRoleResponse,
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          roleId: mockRoleId,
          b2BRoleInput: mockRoleInput,
        },
      })
    )
  })

  it('should handle successful role update', async () => {
    mockRequest.mockResolvedValue({
      updateRoleAsync: mockRoleResponse,
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))
    expect(result.current.updateRole.data).toEqual(mockRoleResponse)
  })

  it('should handle error during role update', async () => {
    const mockError = new Error('GraphQL Error: Failed to update role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isError).toBe(true))
    expect(result.current.updateRole.error).toBeDefined()
  })

  it('should update role name only', async () => {
    const nameOnlyInput = {
      name: 'New Role Name',
    }

    const nameOnlyResponse = {
      id: 5,
      name: 'New Role Name',
      isSystemRole: false,
      behaviors: [1, 2, 3],
    }

    mockRequest.mockResolvedValue({
      updateRoleAsync: nameOnlyResponse,
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: nameOnlyInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))
    expect(result.current.updateRole.data?.name).toBe('New Role Name')
  })

  it('should update behaviors only', async () => {
    const behaviorsOnlyInput = {
      behaviors: [1, 2, 5, 9, 13],
    }

    const behaviorsOnlyResponse = {
      id: 5,
      name: 'Existing Role',
      isSystemRole: false,
      behaviors: [1, 2, 5, 9, 13],
    }

    mockRequest.mockResolvedValue({
      updateRoleAsync: behaviorsOnlyResponse,
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: behaviorsOnlyInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))
    expect(result.current.updateRole.data?.behaviors).toEqual([1, 2, 5, 9, 13])
  })

  it('should update role with multiple account IDs', async () => {
    const multiAccountInput = {
      name: 'Multi-Account Role',
      behaviors: [1, 2, 3],
      accountIds: [1001, 1002, 1003, 1004, 1005],
    }

    mockRequest.mockResolvedValue({
      updateRoleAsync: {
        id: 5,
        name: 'Multi-Account Role',
        isSystemRole: false,
        behaviors: [1, 2, 3],
      },
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: multiAccountInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({
          b2BRoleInput: expect.objectContaining({
            accountIds: [1001, 1002, 1003, 1004, 1005],
          }),
        }),
      })
    )
  })

  it('should handle update of non-existent role', async () => {
    const mockError = new Error('Role not found')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: 999,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isError).toBe(true))
    expect(result.current.updateRole.error?.message).toContain('not found')
  })

  it('should handle duplicate role name error', async () => {
    const mockError = new Error('Role with this name already exists')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: { name: 'Duplicate Role' },
    })

    await waitFor(() => expect(result.current.updateRole.isError).toBe(true))
    expect(result.current.updateRole.error?.message).toContain('already exists')
  })

  it('should handle update of system role', async () => {
    const systemRoleInput = {
      name: 'System Admin Updated',
      isSystemRole: true,
      behaviors: [1, 2, 3, 5, 7, 9, 10, 11, 13],
    }

    mockRequest.mockResolvedValue({
      updateRoleAsync: {
        id: 1,
        name: 'System Admin Updated',
        isSystemRole: true,
        behaviors: [1, 2, 3, 5, 7, 9, 10, 11, 13],
      },
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: 1,
      b2BRoleInput: systemRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))
    expect(result.current.updateRole.data?.isSystemRole).toBe(true)
  })

  it('should reset mutation state', async () => {
    mockRequest.mockResolvedValue({
      updateRoleAsync: mockRoleResponse,
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))

    result.current.updateRole.reset()

    await waitFor(() => {
      expect(result.current.updateRole.status).toBe('idle')
    })
    expect(result.current.updateRole.data).toBeUndefined()
  })

  it('should handle loading state during update', async () => {
    mockRequest.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                updateRoleAsync: mockRoleResponse,
              }),
            100
          )
        })
    )

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isPending).toBe(true))
    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))
  })

  it('should handle permission denied error', async () => {
    const mockError = new Error('Permission denied: Cannot update this role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isError).toBe(true))
    expect(result.current.updateRole.error?.message).toContain('Permission denied')
  })

  it('should handle clearing all behaviors', async () => {
    const noBehaviorsInput = {
      name: 'No Behaviors Role',
      behaviors: [],
    }

    mockRequest.mockResolvedValue({
      updateRoleAsync: {
        id: 5,
        name: 'No Behaviors Role',
        isSystemRole: false,
        behaviors: [],
      },
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: noBehaviorsInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))
    expect(result.current.updateRole.data?.behaviors).toEqual([])
  })

  it('should handle multiple sequential updates', async () => {
    mockRequest.mockResolvedValue({
      updateRoleAsync: mockRoleResponse,
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    // First update
    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: { name: 'First Update' },
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))

    result.current.updateRole.reset()

    // Second update
    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: { name: 'Second Update' },
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledTimes(2)
  })

  it('should handle network error during update', async () => {
    const mockError = new Error('Network error: Unable to connect')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isError).toBe(true))
    expect(result.current.updateRole.error?.message).toContain('Network error')
  })

  it('should update role with large behavior list', async () => {
    const largeBehaviorList = Array.from({ length: 50 }, (_, i) => i + 1)
    const largeInput = {
      name: 'Complex Role',
      behaviors: largeBehaviorList,
    }

    mockRequest.mockResolvedValue({
      updateRoleAsync: {
        id: 5,
        name: 'Complex Role',
        isSystemRole: false,
        behaviors: largeBehaviorList,
      },
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: mockRoleId,
      b2BRoleInput: largeInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))
    expect(result.current.updateRole.data?.behaviors).toHaveLength(50)
  })

  it('should handle update for different role', async () => {
    mockRequest.mockResolvedValue({
      updateRoleAsync: {
        id: 10,
        name: 'Updated Role Name',
        isSystemRole: false,
        behaviors: [1, 2, 3, 5, 7, 9],
      },
    })

    const { result } = renderHook(() => useUpdateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.updateRole.mutate({
      roleId: 10,
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.updateRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: expect.objectContaining({
          roleId: 10,
        }),
      })
    )
  })
})
