import { renderHook, waitFor } from '@testing-library/react'

import { useGetRoleByIdAsync } from './useGetRoleByRoleIdAsync'
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

describe('[hooks] useGetRoleByIdAsync', () => {
  const mockAccountId = 1001
  const mockRoleId = 5
  const mockRole = {
    id: 5,
    name: 'Store Manager',
    isSystemRole: false,
    behaviors: [1, 2, 3, 5, 7, 9, 10],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should fetch role by roleId successfully', async () => {
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: mockRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role).toEqual(mockRole)
    expect(result.current.role?.id).toBe(5)
    expect(result.current.role?.name).toBe('Store Manager')
  })

  it('should be loading initially', () => {
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: mockRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.role).toBeUndefined()
  })

  it('should handle error when fetching fails', async () => {
    const mockError = new Error('GraphQL Error: Failed to fetch role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.role).toBeUndefined()
  })

  it('should not fetch when accountId is 0', () => {
    const { result } = renderHook(() => useGetRoleByIdAsync(0, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.role).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should not fetch when roleId is 0', () => {
    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, 0), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.role).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should not fetch when both accountId and roleId are 0', () => {
    const { result } = renderHook(() => useGetRoleByIdAsync(0, 0), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.role).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should use initialData when provided', () => {
    const initialData = {
      id: 3,
      name: 'Initial Role',
      isSystemRole: false,
      behaviors: [1, 2],
    }

    const { result } = renderHook(
      () => useGetRoleByIdAsync(mockAccountId, mockRoleId, initialData),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    expect(result.current.role).toEqual(initialData)
  })

  it('should call GraphQL client with correct variables', async () => {
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: mockRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
          roleId: mockRoleId,
        },
      })
    )
  })

  it('should handle system role', async () => {
    const systemRole = {
      id: 1,
      name: 'System Administrator',
      isSystemRole: true,
      behaviors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    }

    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: systemRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role?.isSystemRole).toBe(true)
  })

  it('should handle role with no behaviors', async () => {
    const roleWithNoBehaviors = {
      id: 10,
      name: 'Limited Role',
      isSystemRole: false,
      behaviors: [],
    }

    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: roleWithNoBehaviors,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role?.behaviors).toEqual([])
  })

  it('should handle role with minimal fields', async () => {
    const minimalRole = {
      id: 7,
    }

    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: minimalRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role?.id).toBe(7)
    expect(result.current.role?.name).toBeUndefined()
    expect(result.current.role?.isSystemRole).toBeUndefined()
    expect(result.current.role?.behaviors).toBeUndefined()
  })

  it('should handle role with large behavior list', async () => {
    const roleWithManyBehaviors = {
      id: 20,
      name: 'Super Role',
      isSystemRole: false,
      behaviors: Array.from({ length: 100 }, (_, i) => i + 1),
    }

    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: roleWithManyBehaviors,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role?.behaviors).toHaveLength(100)
  })

  it('should handle role not found error', async () => {
    const notFoundError = new Error('Role not found')
    mockRequest.mockRejectedValue(notFoundError)

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, 999), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Role not found')
  })

  it('should handle unauthorized access error', async () => {
    const unauthorizedError = new Error('Unauthorized: Access denied')
    mockRequest.mockRejectedValue(unauthorizedError)

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Unauthorized')
  })

  it('should handle null response', async () => {
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: null,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role).toBeNull()
  })

  it('should handle undefined response', async () => {
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: undefined,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    // React Query treats undefined as invalid data, so it won't reach success state
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 2000 })

    expect(result.current.role).toBeUndefined()
  })

  it('should not retry on error due to retry: 0 config', async () => {
    const mockError = new Error('Fetch failed')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should maintain previous data with placeholderData', async () => {
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: mockRole,
    })

    const { result, rerender } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const firstData = result.current.role

    rerender()

    expect(result.current.role).toEqual(firstData)
  })

  it('should handle role with special characters in name', async () => {
    const roleWithSpecialChars = {
      id: 15,
      name: 'Manager & Supervisor <Test> "Role"',
      isSystemRole: false,
      behaviors: [1, 2, 3],
    }

    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: roleWithSpecialChars,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role?.name).toBe('Manager & Supervisor <Test> "Role"')
  })

  it('should handle different account IDs correctly', async () => {
    const differentAccountId = 2002
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: mockRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(differentAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: differentAccountId,
          roleId: mockRoleId,
        },
      })
    )
  })

  it('should handle different role IDs correctly', async () => {
    const differentRoleId = 25
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: { ...mockRole, id: differentRoleId },
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, differentRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
          roleId: differentRoleId,
        },
      })
    )
  })

  it('should handle network timeout error', async () => {
    const timeoutError = new Error('Network timeout')
    mockRequest.mockRejectedValue(timeoutError)

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Network timeout')
  })

  it('should fetch role when both IDs are valid', async () => {
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: mockRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalled()
    expect(result.current.role).toBeDefined()
  })

  it('should handle role with null behaviors', async () => {
    const roleWithNullBehaviors = {
      id: 12,
      name: 'Test Role',
      isSystemRole: false,
      behaviors: null,
    }

    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: roleWithNullBehaviors,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.role?.behaviors).toBeNull()
  })

  it('should handle negative roleId correctly', async () => {
    const negativeRoleId = -1
    const { result } = renderHook(() => useGetRoleByIdAsync(mockAccountId, negativeRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    // Should still try to fetch since -1 is truthy
    expect(result.current.isLoading).toBe(true)
  })

  it('should handle very large ID numbers', async () => {
    const largeAccountId = 999999999
    const largeRoleId = 888888888
    mockRequest.mockResolvedValue({
      getRoleByRoleIdAsync: mockRole,
    })

    const { result } = renderHook(() => useGetRoleByIdAsync(largeAccountId, largeRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: largeAccountId,
          roleId: largeRoleId,
        },
      })
    )
  })
})
