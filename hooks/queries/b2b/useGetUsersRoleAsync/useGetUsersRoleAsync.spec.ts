import { renderHook, waitFor } from '@testing-library/react'

import { useGetUsersRoleAsync } from './useGetUsersRoleAsync'
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

describe('[hooks] useGetUsersRoleAsync', () => {
  const mockAccountId = 1001
  const mockUserId = 'user123'
  const mockUsersRole = {
    totalCount: 2,
    items: [
      {
        userId: 'user123',
        assignedInScope: {
          type: 'Account',
          id: '1001',
          name: 'Main Account',
        },
        roleId: 5,
        roleName: 'Store Manager',
        roleTags: ['manager', 'store'],
      },
      {
        userId: 'user123',
        assignedInScope: {
          type: 'Location',
          id: '2001',
          name: 'Downtown Store',
        },
        roleId: 7,
        roleName: 'Sales Associate',
        roleTags: ['sales', 'associate'],
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should fetch users role successfully', async () => {
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: mockUsersRole,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole).toEqual(mockUsersRole)
    expect(result.current.usersRole?.totalCount).toBe(2)
    expect(result.current.usersRole?.items).toHaveLength(2)
  })

  it('should be loading initially', () => {
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: mockUsersRole,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.usersRole).toBeUndefined()
  })

  it('should handle error when fetching fails', async () => {
    const mockError = new Error('GraphQL Error: Failed to fetch user roles')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.usersRole).toBeUndefined()
  })

  it('should not fetch when accountId is 0', () => {
    const { result } = renderHook(() => useGetUsersRoleAsync(0, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.usersRole).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should not fetch when userId is empty', () => {
    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, ''), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.usersRole).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should not fetch when both accountId and userId are invalid', () => {
    const { result } = renderHook(() => useGetUsersRoleAsync(0, ''), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.usersRole).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should use initialData when provided', () => {
    const initialData = {
      totalCount: 1,
      items: [
        {
          userId: 'user456',
          assignedInScope: {
            type: 'Account',
            id: '1001',
            name: 'Initial Account',
          },
          roleId: 3,
          roleName: 'Initial Role',
          roleTags: ['initial'],
        },
      ],
    }

    const { result } = renderHook(
      () => useGetUsersRoleAsync(mockAccountId, mockUserId, initialData),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    expect(result.current.usersRole).toEqual(initialData)
  })

  it('should call GraphQL client with correct variables', async () => {
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: mockUsersRole,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
          userId: mockUserId,
        },
      })
    )
  })

  it('should handle user with no roles assigned', async () => {
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: {
        totalCount: 0,
        items: [],
      },
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.totalCount).toBe(0)
    expect(result.current.usersRole?.items).toEqual([])
  })

  it('should handle single role assignment', async () => {
    const singleRole = {
      totalCount: 1,
      items: [
        {
          userId: 'user123',
          assignedInScope: {
            type: 'Account',
            id: '1001',
            name: 'Test Account',
          },
          roleId: 1,
          roleName: 'Administrator',
          roleTags: ['admin'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: singleRole,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.totalCount).toBe(1)
    expect(result.current.usersRole?.items).toHaveLength(1)
  })

  it('should handle multiple role assignments across different scopes', async () => {
    const multipleRoles = {
      totalCount: 4,
      items: [
        {
          userId: 'user123',
          assignedInScope: { type: 'Account', id: '1001', name: 'Account 1' },
          roleId: 1,
          roleName: 'Admin',
          roleTags: ['admin'],
        },
        {
          userId: 'user123',
          assignedInScope: { type: 'Location', id: '2001', name: 'Location 1' },
          roleId: 2,
          roleName: 'Manager',
          roleTags: ['manager'],
        },
        {
          userId: 'user123',
          assignedInScope: { type: 'Location', id: '2002', name: 'Location 2' },
          roleId: 3,
          roleName: 'Associate',
          roleTags: ['associate'],
        },
        {
          userId: 'user123',
          assignedInScope: { type: 'Organization', id: '3001', name: 'Org 1' },
          roleId: 4,
          roleName: 'Viewer',
          roleTags: ['viewer'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: multipleRoles,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.totalCount).toBe(4)
    expect(result.current.usersRole?.items).toHaveLength(4)

    const scopeTypes = result.current.usersRole?.items?.map((item) => item.assignedInScope?.type)
    expect(scopeTypes).toContain('Account')
    expect(scopeTypes).toContain('Location')
    expect(scopeTypes).toContain('Organization')
  })

  it('should handle roles with no tags', async () => {
    const rolesWithoutTags = {
      totalCount: 1,
      items: [
        {
          userId: 'user123',
          assignedInScope: {
            type: 'Account',
            id: '1001',
            name: 'Test Account',
          },
          roleId: 5,
          roleName: 'Basic Role',
          roleTags: [],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: rolesWithoutTags,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.items?.[0].roleTags).toEqual([])
  })

  it('should handle roles with minimal fields', async () => {
    const minimalRoles = {
      totalCount: 1,
      items: [
        {
          userId: 'user123',
          roleId: 10,
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: minimalRoles,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.items?.[0].userId).toBe('user123')
    expect(result.current.usersRole?.items?.[0].roleId).toBe(10)
    expect(result.current.usersRole?.items?.[0].roleName).toBeUndefined()
    expect(result.current.usersRole?.items?.[0].assignedInScope).toBeUndefined()
  })

  it('should handle roles with multiple tags', async () => {
    const rolesWithManyTags = {
      totalCount: 1,
      items: [
        {
          userId: 'user123',
          assignedInScope: {
            type: 'Account',
            id: '1001',
            name: 'Test Account',
          },
          roleId: 8,
          roleName: 'Super Role',
          roleTags: ['admin', 'manager', 'supervisor', 'lead', 'senior'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: rolesWithManyTags,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.items?.[0].roleTags).toHaveLength(5)
  })

  it('should handle unauthorized access error', async () => {
    const unauthorizedError = new Error('Unauthorized: Access denied')
    mockRequest.mockRejectedValue(unauthorizedError)

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Unauthorized')
  })

  it('should handle user not found error', async () => {
    const notFoundError = new Error('User not found')
    mockRequest.mockRejectedValue(notFoundError)

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, 'nonexistent'), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('User not found')
  })

  it('should handle empty response as no roles assigned', async () => {
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: {
        totalCount: 0,
        items: [],
      },
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.totalCount).toBe(0)
    expect(result.current.usersRole?.items).toEqual([])
  })

  it('should not retry on error due to retry: 0 config', async () => {
    const mockError = new Error('Fetch failed')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should maintain previous data with placeholderData', async () => {
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: mockUsersRole,
    })

    const { result, rerender } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const firstData = result.current.usersRole

    rerender()

    expect(result.current.usersRole).toEqual(firstData)
  })

  it('should handle special characters in scope names', async () => {
    const rolesWithSpecialChars = {
      totalCount: 1,
      items: [
        {
          userId: 'user123',
          assignedInScope: {
            type: 'Location',
            id: '2001',
            name: 'Store & Warehouse <Main> "Downtown"',
          },
          roleId: 5,
          roleName: 'Manager & Supervisor',
          roleTags: ['manager'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: rolesWithSpecialChars,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.items?.[0].assignedInScope?.name).toBe(
      'Store & Warehouse <Main> "Downtown"'
    )
  })

  it('should handle network timeout error', async () => {
    const timeoutError = new Error('Network timeout')
    mockRequest.mockRejectedValue(timeoutError)

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Network timeout')
  })

  it('should handle different accountId correctly', async () => {
    const differentAccountId = 2002
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: mockUsersRole,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(differentAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: differentAccountId,
          userId: mockUserId,
        },
      })
    )
  })

  it('should handle different userId correctly', async () => {
    const differentUserId = 'user456'
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: mockUsersRole,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, differentUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
          userId: differentUserId,
        },
      })
    )
  })

  it('should handle response with null items', async () => {
    mockRequest.mockResolvedValue({
      getUsersRoleAsync: {
        totalCount: 0,
        items: null,
      },
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.items).toBeNull()
  })

  it('should handle large number of role assignments', async () => {
    const manyRoles = {
      totalCount: 50,
      items: Array.from({ length: 50 }, (_, i) => ({
        userId: 'user123',
        assignedInScope: {
          type: 'Location',
          id: `${2000 + i}`,
          name: `Location ${i + 1}`,
        },
        roleId: i + 1,
        roleName: `Role ${i + 1}`,
        roleTags: [`tag${i + 1}`],
      })),
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: manyRoles,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.totalCount).toBe(50)
    expect(result.current.usersRole?.items).toHaveLength(50)
  })

  it('should handle roles with null assignedInScope', async () => {
    const rolesWithNullScope = {
      totalCount: 1,
      items: [
        {
          userId: 'user123',
          assignedInScope: null,
          roleId: 5,
          roleName: 'Test Role',
          roleTags: ['test'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: rolesWithNullScope,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.items?.[0].assignedInScope).toBeNull()
  })

  it('should handle mismatch between totalCount and items length', async () => {
    const mismatchedData = {
      totalCount: 10,
      items: [
        {
          userId: 'user123',
          assignedInScope: { type: 'Account', id: '1001', name: 'Account' },
          roleId: 1,
          roleName: 'Role 1',
          roleTags: ['tag1'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: mismatchedData,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.totalCount).toBe(10)
    expect(result.current.usersRole?.items).toHaveLength(1)
  })

  it('should handle roles with null roleTags', async () => {
    const rolesWithNullTags = {
      totalCount: 1,
      items: [
        {
          userId: 'user123',
          assignedInScope: { type: 'Account', id: '1001', name: 'Account' },
          roleId: 5,
          roleName: 'Test Role',
          roleTags: null,
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getUsersRoleAsync: rolesWithNullTags,
    })

    const { result } = renderHook(() => useGetUsersRoleAsync(mockAccountId, mockUserId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.usersRole?.items?.[0].roleTags).toBeNull()
  })
})
