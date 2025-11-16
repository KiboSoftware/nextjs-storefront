import { renderHook, waitFor } from '@testing-library/react'

import { useCreateRoleAsync } from './useCreateRoleAsync'
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

describe('[hooks] useCreateRoleAsync', () => {
  const mockRoleInput = {
    name: 'Test Role',
    isSystemRole: false,
    behaviors: [1, 2, 3, 5, 7],
    accountIds: [1001, 1002],
  }

  const mockRoleResponse = {
    id: 10,
    name: 'Test Role',
    isSystemRole: false,
    behaviors: [1, 2, 3, 5, 7],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.createRole.status).toBe('idle')
  })

  it('should call createRoleAsync mutation with correct parameters', async () => {
    mockRequest.mockResolvedValue({
      createRoleAsync: mockRoleResponse,
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          b2BRoleInput: mockRoleInput,
        },
      })
    )
  })

  it('should handle successful role creation', async () => {
    mockRequest.mockResolvedValue({
      createRoleAsync: mockRoleResponse,
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))
    expect(result.current.createRole.data).toEqual(mockRoleResponse)
  })

  it('should handle error during role creation', async () => {
    const mockError = new Error('GraphQL Error: Failed to create role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isError).toBe(true))
    expect(result.current.createRole.error).toBeDefined()
  })

  it('should create role with minimal required fields', async () => {
    const minimalRoleInput = {
      name: 'Minimal Role',
      behaviors: [1, 2],
    }

    const minimalRoleResponse = {
      id: 11,
      name: 'Minimal Role',
      isSystemRole: false,
      behaviors: [1, 2],
    }

    mockRequest.mockResolvedValue({
      createRoleAsync: minimalRoleResponse,
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: minimalRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))
    expect(result.current.createRole.data).toEqual(minimalRoleResponse)
  })

  it('should create role with multiple account IDs', async () => {
    const roleInputWithAccounts = {
      name: 'Multi-Account Role',
      behaviors: [1, 2, 3],
      accountIds: [1001, 1002, 1003, 1004],
    }

    mockRequest.mockResolvedValue({
      createRoleAsync: {
        id: 12,
        name: 'Multi-Account Role',
        isSystemRole: false,
        behaviors: [1, 2, 3],
      },
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: roleInputWithAccounts,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          b2BRoleInput: expect.objectContaining({
            accountIds: [1001, 1002, 1003, 1004],
          }),
        },
      })
    )
  })

  it('should create role with empty behaviors array', async () => {
    const roleInputWithNoBehaviors = {
      name: 'Empty Behaviors Role',
      behaviors: [],
      accountIds: [1001],
    }

    mockRequest.mockResolvedValue({
      createRoleAsync: {
        id: 13,
        name: 'Empty Behaviors Role',
        isSystemRole: false,
        behaviors: [],
      },
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: roleInputWithNoBehaviors,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))
    expect(result.current.createRole.data?.behaviors).toEqual([])
  })

  it('should handle duplicate role name error', async () => {
    const mockError = new Error('Role with this name already exists')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isError).toBe(true))
    expect(result.current.createRole.error?.message).toContain('already exists')
  })

  it('should reset mutation state', async () => {
    mockRequest.mockResolvedValue({
      createRoleAsync: mockRoleResponse,
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))

    result.current.createRole.reset()

    await waitFor(() => {
      expect(result.current.createRole.status).toBe('idle')
    })
    expect(result.current.createRole.data).toBeUndefined()
  })

  it('should handle role creation with system role flag', async () => {
    const systemRoleInput = {
      name: 'System Admin',
      isSystemRole: true,
      behaviors: [1, 2, 3, 5, 7, 9, 10, 11, 13],
      accountIds: [1001],
    }

    mockRequest.mockResolvedValue({
      createRoleAsync: {
        id: 14,
        name: 'System Admin',
        isSystemRole: true,
        behaviors: [1, 2, 3, 5, 7, 9, 10, 11, 13],
      },
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: systemRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))
    expect(result.current.createRole.data?.isSystemRole).toBe(true)
  })

  it('should handle loading state during creation', async () => {
    mockRequest.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                createRoleAsync: mockRoleResponse,
              }),
            100
          )
        })
    )

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: mockRoleInput,
    })

    await waitFor(() => expect(result.current.createRole.isPending).toBe(true))
    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))
  })

  it('should create role with large behavior list', async () => {
    const largeBehaviorList = Array.from({ length: 50 }, (_, i) => i + 1)
    const roleInputWithManyBehaviors = {
      name: 'Complex Role',
      behaviors: largeBehaviorList,
      accountIds: [1001],
    }

    mockRequest.mockResolvedValue({
      createRoleAsync: {
        id: 15,
        name: 'Complex Role',
        isSystemRole: false,
        behaviors: largeBehaviorList,
      },
    })

    const { result } = renderHook(() => useCreateRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.createRole.mutate({
      b2BRoleInput: roleInputWithManyBehaviors,
    })

    await waitFor(() => expect(result.current.createRole.isSuccess).toBe(true))
    expect(result.current.createRole.data?.behaviors).toHaveLength(50)
  })
})
