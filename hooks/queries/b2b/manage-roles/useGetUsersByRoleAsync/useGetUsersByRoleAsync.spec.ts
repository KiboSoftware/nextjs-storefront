import { renderHook, waitFor } from '@testing-library/react'

import { useGetUsersByRoleAsync } from './useGetUsersByRoleAsync'
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

describe('[hooks] useGetUsersByRoleAsync', () => {
  const mockAccountId = 1001
  const mockRoleId = 5

  const mockUsers = [
    {
      emailAddress: 'admin@example.com',
      userName: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      localeCode: 'en-US',
      userId: 'user1',
      roles: [
        {
          roleId: 5,
          roleName: 'Administrator',
          roleTags: ['admin', 'superuser'],
        },
      ],
      isLocked: false,
      isActive: true,
      isRemoved: false,
      acceptsMarketing: true,
      hasExternalPassword: false,
    },
    {
      emailAddress: 'manager@example.com',
      userName: 'storemanager',
      firstName: 'Store',
      lastName: 'Manager',
      localeCode: 'en-US',
      userId: 'user2',
      roles: [
        {
          roleId: 5,
          roleName: 'Store Manager',
          roleTags: ['manager'],
        },
      ],
      isLocked: false,
      isActive: true,
      isRemoved: false,
      acceptsMarketing: false,
      hasExternalPassword: true,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should initialize with correct default state', () => {
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: mockUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.users).toBeUndefined()
  })

  it('should fetch users by role successfully', async () => {
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: mockUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users).toEqual(mockUsers)
    expect(result.current.users).toHaveLength(2)
  })

  it('should call GraphQL client with correct variables', async () => {
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: mockUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
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

  it('should handle error when fetching fails', async () => {
    const mockError = new Error('GraphQL Error: Failed to fetch users')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.users).toBeUndefined()
  })

  it('should not fetch when accountId is 0', () => {
    const { result } = renderHook(() => useGetUsersByRoleAsync(0, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.users).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should not fetch when roleId is 0', () => {
    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, 0), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.users).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should not fetch when both accountId and roleId are 0', () => {
    const { result } = renderHook(() => useGetUsersByRoleAsync(0, 0), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(false)
    expect(result.current.users).toBeUndefined()
    expect(mockRequest).not.toHaveBeenCalled()
  })

  it('should use initialData when provided', () => {
    const initialData = [
      {
        emailAddress: 'initial@example.com',
        userName: 'initial',
        firstName: 'Initial',
        lastName: 'User',
        userId: 'initial1',
      },
    ]

    const { result } = renderHook(
      () => useGetUsersByRoleAsync(mockAccountId, mockRoleId, initialData),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    expect(result.current.users).toEqual(initialData)
  })

  it('should handle empty users list', async () => {
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: [],
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users).toEqual([])
    expect(result.current.users).toHaveLength(0)
  })

  it('should handle users with minimal fields', async () => {
    const minimalUsers = [
      {
        emailAddress: 'user1@example.com',
        userId: 'user1',
      },
      {
        emailAddress: 'user2@example.com',
        userId: 'user2',
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: minimalUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].emailAddress).toBe('user1@example.com')
    expect(result.current.users?.[0].userName).toBeUndefined()
  })

  it('should handle users with multiple roles', async () => {
    const usersWithMultipleRoles = [
      {
        emailAddress: 'multirole@example.com',
        userName: 'multirole',
        firstName: 'Multi',
        lastName: 'Role',
        userId: 'user1',
        roles: [
          { roleId: 1, roleName: 'Admin', roleTags: ['admin'] },
          { roleId: 2, roleName: 'Manager', roleTags: ['manager'] },
          { roleId: 3, roleName: 'Sales', roleTags: ['sales'] },
        ],
        isActive: true,
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: usersWithMultipleRoles,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].roles).toHaveLength(3)
  })

  it('should handle locked users', async () => {
    const lockedUsers = [
      {
        emailAddress: 'locked@example.com',
        userName: 'locked',
        userId: 'user1',
        isLocked: true,
        isActive: false,
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: lockedUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].isLocked).toBe(true)
    expect(result.current.users?.[0].isActive).toBe(false)
  })

  it('should handle removed users', async () => {
    const removedUsers = [
      {
        emailAddress: 'removed@example.com',
        userName: 'removed',
        userId: 'user1',
        isRemoved: true,
        isActive: false,
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: removedUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].isRemoved).toBe(true)
  })

  it('should handle users with different locale codes', async () => {
    const usersWithLocales = [
      {
        emailAddress: 'user1@example.com',
        userId: 'user1',
        localeCode: 'en-US',
      },
      {
        emailAddress: 'user2@example.com',
        userId: 'user2',
        localeCode: 'fr-FR',
      },
      {
        emailAddress: 'user3@example.com',
        userId: 'user3',
        localeCode: 'de-DE',
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: usersWithLocales,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.map((u) => u.localeCode)).toEqual(['en-US', 'fr-FR', 'de-DE'])
  })

  it('should handle users with external passwords', async () => {
    const usersWithExternalPasswords = [
      {
        emailAddress: 'external@example.com',
        userId: 'user1',
        hasExternalPassword: true,
      },
      {
        emailAddress: 'internal@example.com',
        userId: 'user2',
        hasExternalPassword: false,
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: usersWithExternalPasswords,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].hasExternalPassword).toBe(true)
    expect(result.current.users?.[1].hasExternalPassword).toBe(false)
  })

  it('should handle users with marketing preferences', async () => {
    const usersWithMarketing = [
      {
        emailAddress: 'marketing@example.com',
        userId: 'user1',
        acceptsMarketing: true,
      },
      {
        emailAddress: 'nomarketing@example.com',
        userId: 'user2',
        acceptsMarketing: false,
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: usersWithMarketing,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].acceptsMarketing).toBe(true)
    expect(result.current.users?.[1].acceptsMarketing).toBe(false)
  })

  it('should handle unauthorized access error', async () => {
    const unauthorizedError = new Error('Unauthorized: Access denied')
    mockRequest.mockRejectedValue(unauthorizedError)

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Unauthorized')
  })

  it('should handle role not found error', async () => {
    const notFoundError = new Error('Role not found')
    mockRequest.mockRejectedValue(notFoundError)

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, 999), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Role not found')
  })

  it('should handle account not found error', async () => {
    const accountError = new Error('Account not found')
    mockRequest.mockRejectedValue(accountError)

    const { result } = renderHook(() => useGetUsersByRoleAsync(999999, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Account not found')
  })

  it('should not retry on error due to retry: 0 config', async () => {
    const mockError = new Error('Fetch failed')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should handle network timeout error', async () => {
    const timeoutError = new Error('Network timeout')
    mockRequest.mockRejectedValue(timeoutError)

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Network timeout')
  })

  it('should handle large list of users', async () => {
    const largeUserList = Array.from({ length: 100 }, (_, i) => ({
      emailAddress: `user${i}@example.com`,
      userName: `user${i}`,
      firstName: `User`,
      lastName: `${i}`,
      userId: `user${i}`,
      isActive: true,
    }))

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: largeUserList,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users).toHaveLength(100)
  })

  it('should handle users with null or undefined optional fields', async () => {
    const usersWithNullFields = [
      {
        emailAddress: 'user@example.com',
        userName: 'user',
        userId: 'user1',
        firstName: null,
        lastName: null,
        localeCode: undefined,
        roles: null,
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: usersWithNullFields,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].firstName).toBeNull()
    expect(result.current.users?.[0].roles).toBeNull()
  })

  it('should handle users with special characters in names', async () => {
    const usersWithSpecialChars = [
      {
        emailAddress: "user.o'connor@example.com",
        userName: "o'connor",
        firstName: "O'Connor",
        lastName: 'Müller-Schmidt',
        userId: 'user1',
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: usersWithSpecialChars,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].firstName).toBe("O'Connor")
    expect(result.current.users?.[0].lastName).toBe('Müller-Schmidt')
  })

  it('should maintain previous data with placeholderData', async () => {
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: mockUsers,
    })

    const { result, rerender } = renderHook(
      () => useGetUsersByRoleAsync(mockAccountId, mockRoleId),
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const firstData = result.current.users

    rerender()

    expect(result.current.users).toEqual(firstData)
  })

  it('should handle different roleId correctly', async () => {
    const differentRoleId = 10
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: mockUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, differentRoleId), {
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

  it('should handle different accountId correctly', async () => {
    const differentAccountId = 2002
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: mockUsers,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(differentAccountId, mockRoleId), {
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

  it('should handle null response gracefully', async () => {
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: null,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users).toEqual([])
  })

  it('should handle undefined response gracefully', async () => {
    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: undefined,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users).toEqual([])
  })

  it('should handle users with empty role tags', async () => {
    const usersWithEmptyTags = [
      {
        emailAddress: 'user@example.com',
        userId: 'user1',
        roles: [
          {
            roleId: 5,
            roleName: 'Basic Role',
            roleTags: [],
          },
        ],
      },
    ]

    mockRequest.mockResolvedValue({
      getUsersByRoleAsync: usersWithEmptyTags,
    })

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.users?.[0].roles?.[0].roleTags).toEqual([])
  })

  it('should handle GraphQL error response', async () => {
    const graphQLError = new Error('GraphQL Error: Invalid query')
    mockRequest.mockRejectedValue(graphQLError)

    const { result } = renderHook(() => useGetUsersByRoleAsync(mockAccountId, mockRoleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('GraphQL Error')
  })
})
