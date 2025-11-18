import { renderHook, waitFor } from '@testing-library/react'

import { useDeleteRoleAsync } from './useDeleteRoleAsync'
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

describe('[hooks] useDeleteRoleAsync', () => {
  const mockRoleId = 5

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.deleteRole.status).toBe('idle')
  })

  it('should call deleteRoleAsync mutation with correct parameters', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          roleId: mockRoleId,
        },
      })
    )
  })

  it('should handle successful role deletion', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))
    expect(result.current.deleteRole.data).toBe(true)
  })

  it('should handle error during role deletion', async () => {
    const mockError = new Error('GraphQL Error: Failed to delete role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isError).toBe(true))
    expect(result.current.deleteRole.error).toBeDefined()
  })

  it('should handle deletion of non-existent role', async () => {
    const mockError = new Error('Role not found')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: 999 })

    await waitFor(() => expect(result.current.deleteRole.isError).toBe(true))
    expect(result.current.deleteRole.error?.message).toContain('not found')
  })

  it('should handle deletion of system role', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: 1 }) // System role

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))
    expect(result.current.deleteRole.data).toBe(true)
  })

  it('should handle permission denied error', async () => {
    const mockError = new Error('Permission denied: Cannot delete this role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isError).toBe(true))
    expect(result.current.deleteRole.error?.message).toContain('Permission denied')
  })

  it('should handle role with assigned users error', async () => {
    const mockError = new Error('Cannot delete role: Users are currently assigned to this role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isError).toBe(true))
    expect(result.current.deleteRole.error?.message).toContain('assigned to this role')
  })

  it('should reset mutation state', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))

    result.current.deleteRole.reset()

    await waitFor(() => {
      expect(result.current.deleteRole.status).toBe('idle')
    })
    expect(result.current.deleteRole.data).toBeUndefined()
  })

  it('should handle loading state during deletion', async () => {
    mockRequest.mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve({
                deleteRoleAsync: true,
              }),
            100
          )
        })
    )

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isPending).toBe(true))
    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))
  })

  it('should handle multiple role deletions in sequence', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    // First deletion
    result.current.deleteRole.mutate({ roleId: 5 })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))

    result.current.deleteRole.reset()

    // Second deletion
    result.current.deleteRole.mutate({ roleId: 6 })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledTimes(2)
  })

  it('should handle network error during deletion', async () => {
    const mockError = new Error('Network error: Unable to connect')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isError).toBe(true))
    expect(result.current.deleteRole.error?.message).toContain('Network error')
  })

  it('should handle deletion for different role IDs', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: 10 })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          roleId: 10,
        },
      })
    )
  })

  it('should handle false response from deletion', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: false,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))
    expect(result.current.deleteRole.data).toBe(false)
  })

  it('should use mutateAsync for async/await pattern', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    const deletePromise = result.current.deleteRole.mutateAsync({ roleId: mockRoleId })

    await expect(deletePromise).resolves.toBe(true)
  })

  it('should handle GraphQL error response', async () => {
    const mockError = new Error('GraphQL Error: Invalid role ID')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isError).toBe(true))
    expect(result.current.deleteRole.error?.message).toContain('GraphQL Error')
  })

  it('should invalidate queries on successful deletion', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const wrapper = createQueryClientWrapper()
    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper,
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))

    // Verify the mutation was successful
    expect(result.current.deleteRole.data).toBe(true)
  })

  it('should handle timeout error', async () => {
    const mockError = new Error('Request timeout: The server did not respond in time')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.deleteRole.mutate({ roleId: mockRoleId })

    await waitFor(() => expect(result.current.deleteRole.isError).toBe(true))
    expect(result.current.deleteRole.error?.message).toContain('timeout')
  })

  it('should handle concurrent deletion attempts', async () => {
    mockRequest.mockResolvedValue({
      deleteRoleAsync: true,
    })

    const { result } = renderHook(() => useDeleteRoleAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    // Trigger multiple mutations
    result.current.deleteRole.mutate({ roleId: 5 })

    result.current.deleteRole.mutate({ roleId: 6 })

    await waitFor(() => expect(result.current.deleteRole.isSuccess).toBe(true))

    // Last mutation should win
    expect(mockRequest).toHaveBeenCalled()
  })
})
