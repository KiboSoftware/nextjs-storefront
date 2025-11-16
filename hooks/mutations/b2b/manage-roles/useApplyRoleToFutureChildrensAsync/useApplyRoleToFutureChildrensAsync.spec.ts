import { renderHook, waitFor } from '@testing-library/react'

import { useApplyRoleToFutureChildrensAsync } from './useApplyRoleToFutureChildrensAsync'
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

describe('[hooks] useApplyRoleToFutureChildrensAsync', () => {
  const mockAccountId = 1001
  const mockRoleId = 5

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useApplyRoleToFutureChildrensAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.applyRoleToFutureChildren.status).toBe('idle')
  })

  it('should call applyRoleToFutureChildrensAsync mutation with correct parameters', async () => {
    mockRequest.mockResolvedValue({
      applyRoleToFutureChildrensAsync: true,
    })

    const { result } = renderHook(() => useApplyRoleToFutureChildrensAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.applyRoleToFutureChildren.mutate({
      accountId: mockAccountId,
      roleId: mockRoleId,
    })

    await waitFor(() => expect(result.current.applyRoleToFutureChildren.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
          roleId: mockRoleId,
        },
      })
    )
  })

  it('should handle successful mutation', async () => {
    mockRequest.mockResolvedValue({
      applyRoleToFutureChildrensAsync: true,
    })

    const { result } = renderHook(() => useApplyRoleToFutureChildrensAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.applyRoleToFutureChildren.mutate({
      accountId: mockAccountId,
      roleId: mockRoleId,
    })

    await waitFor(() => expect(result.current.applyRoleToFutureChildren.isSuccess).toBe(true))
    expect(result.current.applyRoleToFutureChildren.data).toBe(true)
  })

  it('should handle error during mutation', async () => {
    const mockError = new Error('GraphQL Error: Failed to apply role')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useApplyRoleToFutureChildrensAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.applyRoleToFutureChildren.mutate({
      accountId: mockAccountId,
      roleId: mockRoleId,
    })

    await waitFor(() => expect(result.current.applyRoleToFutureChildren.isError).toBe(true))
    expect(result.current.applyRoleToFutureChildren.error).toBeDefined()
  })

  it('should handle mutation with enabled parameter', async () => {
    mockRequest.mockResolvedValue({
      applyRoleToFutureChildrensAsync: true,
    })

    const { result } = renderHook(() => useApplyRoleToFutureChildrensAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.applyRoleToFutureChildren.mutate({
      accountId: mockAccountId,
      roleId: mockRoleId,
      enabled: false,
    })

    await waitFor(() => expect(result.current.applyRoleToFutureChildren.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
          roleId: mockRoleId,
          enabled: false,
        },
      })
    )
  })

  it('should handle mutation with undefined enabled parameter', async () => {
    mockRequest.mockResolvedValue({
      applyRoleToFutureChildrensAsync: true,
    })

    const { result } = renderHook(() => useApplyRoleToFutureChildrensAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.applyRoleToFutureChildren.mutate({
      accountId: mockAccountId,
      roleId: mockRoleId,
      enabled: undefined,
    })

    await waitFor(() => expect(result.current.applyRoleToFutureChildren.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          accountId: mockAccountId,
          roleId: mockRoleId,
          enabled: undefined,
        },
      })
    )
  })

  it('should reset mutation state', async () => {
    mockRequest.mockResolvedValue({
      applyRoleToFutureChildrensAsync: true,
    })

    const { result } = renderHook(() => useApplyRoleToFutureChildrensAsync(), {
      wrapper: createQueryClientWrapper(),
    })

    result.current.applyRoleToFutureChildren.mutate({
      accountId: mockAccountId,
      roleId: mockRoleId,
    })

    await waitFor(() => expect(result.current.applyRoleToFutureChildren.isSuccess).toBe(true))

    result.current.applyRoleToFutureChildren.reset()

    await waitFor(() => {
      expect(result.current.applyRoleToFutureChildren.status).toBe('idle')
    })
    expect(result.current.applyRoleToFutureChildren.data).toBeUndefined()
  })
})
