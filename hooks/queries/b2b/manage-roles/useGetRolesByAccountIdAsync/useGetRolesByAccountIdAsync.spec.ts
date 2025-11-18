import { renderHook, waitFor } from '@testing-library/react'

import { useGetRolesByAccountIdAsync } from './useGetRolesByAccountIdAsync'
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

describe('[hooks] useGetRolesByAccountIdAsync', () => {
  const mockAccountId = 1001
  const mockRoles = {
    startIndex: 0,
    pageSize: 20,
    pageCount: 1,
    totalCount: 3,
    items: [
      {
        id: 1,
        name: 'Administrator',
        isSystemRole: true,
        behaviors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        id: 2,
        name: 'Store Manager',
        isSystemRole: false,
        behaviors: [1, 2, 3, 5, 7],
      },
      {
        id: 3,
        name: 'Sales Associate',
        isSystemRole: false,
        behaviors: [1, 2],
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should fetch roles by accountId successfully', async () => {
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mockRoles,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles).toEqual(mockRoles)
    expect(result.current.roles?.totalCount).toBe(3)
    expect(result.current.roles?.items).toHaveLength(3)
  })

  it('should be loading initially', () => {
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mockRoles,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.roles).toBeUndefined()
  })

  it('should handle error when fetching fails', async () => {
    const mockError = new Error('GraphQL Error: Failed to fetch roles')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.roles).toBeUndefined()
  })

  it('should not fetch when accountId is 0', () => {
    const { result } = renderHook(() => useGetRolesByAccountIdAsync(0), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.roles).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should use initialData when provided', () => {
    const initialData = {
      startIndex: 0,
      pageSize: 10,
      pageCount: 1,
      totalCount: 1,
      items: [
        {
          id: 1,
          name: 'Initial Role',
          isSystemRole: false,
          behaviors: [1, 2],
        },
      ],
    }

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId, initialData), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.roles).toEqual(initialData)
  })

  it('should call GraphQL client with correct variables', async () => {
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mockRoles,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
        },
      })
    )
  })

  it('should handle empty roles list', async () => {
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: {
        startIndex: 0,
        pageSize: 20,
        pageCount: 0,
        totalCount: 0,
        items: [],
      },
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.totalCount).toBe(0)
    expect(result.current.roles?.items).toEqual([])
  })

  it('should handle pagination info correctly', async () => {
    const paginatedResponse = {
      startIndex: 20,
      pageSize: 20,
      pageCount: 3,
      totalCount: 50,
      items: mockRoles.items,
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: paginatedResponse,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.startIndex).toBe(20)
    expect(result.current.roles?.pageSize).toBe(20)
    expect(result.current.roles?.pageCount).toBe(3)
    expect(result.current.roles?.totalCount).toBe(50)
  })

  it('should handle large list of roles', async () => {
    const largeRolesList = {
      startIndex: 0,
      pageSize: 100,
      pageCount: 1,
      totalCount: 100,
      items: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Role ${i + 1}`,
        isSystemRole: false,
        behaviors: [1, 2, 3],
      })),
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: largeRolesList,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.totalCount).toBe(100)
    expect(result.current.roles?.items).toHaveLength(100)
  })

  it('should handle roles with no behaviors', async () => {
    const rolesWithNoBehaviors = {
      startIndex: 0,
      pageSize: 20,
      pageCount: 1,
      totalCount: 2,
      items: [
        {
          id: 1,
          name: 'Limited Role 1',
          isSystemRole: false,
          behaviors: [],
        },
        {
          id: 2,
          name: 'Limited Role 2',
          isSystemRole: false,
          behaviors: [],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: rolesWithNoBehaviors,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.items?.[0].behaviors).toEqual([])
    expect(result.current.roles?.items?.[1].behaviors).toEqual([])
  })

  it('should handle mix of system and custom roles', async () => {
    const mixedRoles = {
      startIndex: 0,
      pageSize: 20,
      pageCount: 1,
      totalCount: 4,
      items: [
        { id: 1, name: 'System Admin', isSystemRole: true, behaviors: [1, 2, 3] },
        { id: 2, name: 'Custom Role 1', isSystemRole: false, behaviors: [1, 2] },
        { id: 3, name: 'System Manager', isSystemRole: true, behaviors: [1, 2, 3, 4] },
        { id: 4, name: 'Custom Role 2', isSystemRole: false, behaviors: [1] },
      ],
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mixedRoles,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const systemRoles = result.current.roles?.items?.filter((role) => role.isSystemRole)
    const customRoles = result.current.roles?.items?.filter((role) => !role.isSystemRole)

    expect(systemRoles).toHaveLength(2)
    expect(customRoles).toHaveLength(2)
  })

  it('should handle roles with minimal fields', async () => {
    const minimalRoles = {
      startIndex: 0,
      pageSize: 20,
      pageCount: 1,
      totalCount: 2,
      items: [{ id: 1 }, { id: 2 }],
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: minimalRoles,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.items?.[0].id).toBe(1)
    expect(result.current.roles?.items?.[0].name).toBeUndefined()
    expect(result.current.roles?.items?.[1].id).toBe(2)
  })

  it('should handle unauthorized access error', async () => {
    const unauthorizedError = new Error('Unauthorized: Access denied')
    mockRequest.mockRejectedValue(unauthorizedError)

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Unauthorized')
  })

  it('should handle account not found error', async () => {
    const notFoundError = new Error('Account not found')
    mockRequest.mockRejectedValue(notFoundError)

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(999999), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Account not found')
  })

  it('should handle null response as empty data', async () => {
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: {
        startIndex: 0,
        pageSize: 0,
        pageCount: 0,
        totalCount: 0,
        items: [],
      },
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.totalCount).toBe(0)
    expect(result.current.roles?.items).toEqual([])
  })

  it('should not retry on error due to retry: 0 config', async () => {
    const mockError = new Error('Fetch failed')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should maintain previous data with placeholderData', async () => {
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mockRoles,
    })

    const { result, rerender } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const firstData = result.current.roles

    rerender()

    expect(result.current.roles).toEqual(firstData)
  })

  it('should handle roles with special characters in names', async () => {
    const rolesWithSpecialChars = {
      startIndex: 0,
      pageSize: 20,
      pageCount: 1,
      totalCount: 3,
      items: [
        { id: 1, name: 'Role & Special', isSystemRole: false, behaviors: [1] },
        { id: 2, name: 'Role <Test>', isSystemRole: false, behaviors: [2] },
        { id: 3, name: 'Role "Quoted"', isSystemRole: false, behaviors: [3] },
      ],
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: rolesWithSpecialChars,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.items?.[0].name).toBe('Role & Special')
    expect(result.current.roles?.items?.[1].name).toBe('Role <Test>')
    expect(result.current.roles?.items?.[2].name).toBe('Role "Quoted"')
  })

  it('should handle network timeout error', async () => {
    const timeoutError = new Error('Network timeout')
    mockRequest.mockRejectedValue(timeoutError)

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Network timeout')
  })

  it('should handle different account IDs correctly', async () => {
    const differentAccountId = 2002
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mockRoles,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(differentAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: differentAccountId,
        },
      })
    )
  })

  it('should handle response with null items', async () => {
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: {
        startIndex: 0,
        pageSize: 20,
        pageCount: 0,
        totalCount: 0,
        items: null,
      },
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.items).toBeNull()
  })

  it('should handle mismatch between totalCount and items length', async () => {
    const mismatchedData = {
      startIndex: 0,
      pageSize: 20,
      pageCount: 5,
      totalCount: 100,
      items: [
        { id: 1, name: 'Role 1', isSystemRole: false, behaviors: [1] },
        { id: 2, name: 'Role 2', isSystemRole: false, behaviors: [2] },
      ],
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mismatchedData,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.totalCount).toBe(100)
    expect(result.current.roles?.items).toHaveLength(2)
  })

  it('should handle roles with null behaviors', async () => {
    const rolesWithNullBehaviors = {
      startIndex: 0,
      pageSize: 20,
      pageCount: 1,
      totalCount: 1,
      items: [
        {
          id: 1,
          name: 'Test Role',
          isSystemRole: false,
          behaviors: null,
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: rolesWithNullBehaviors,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.items?.[0].behaviors).toBeNull()
  })

  it('should handle very large accountId', async () => {
    const largeAccountId = 999999999
    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: mockRoles,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(largeAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: largeAccountId,
        },
      })
    )
  })

  it('should handle roles with large behavior arrays', async () => {
    const rolesWithManyBehaviors = {
      startIndex: 0,
      pageSize: 20,
      pageCount: 1,
      totalCount: 1,
      items: [
        {
          id: 1,
          name: 'Super Admin',
          isSystemRole: true,
          behaviors: Array.from({ length: 200 }, (_, i) => i + 1),
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getRolesByAccountIdAsync: rolesWithManyBehaviors,
    })

    const { result } = renderHook(() => useGetRolesByAccountIdAsync(mockAccountId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.roles?.items?.[0].behaviors).toHaveLength(200)
  })
})
