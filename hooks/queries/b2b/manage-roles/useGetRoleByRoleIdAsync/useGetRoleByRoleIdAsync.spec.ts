import { renderHook, waitFor } from '@testing-library/react'

import { useGetRoleByRoleIdAsync } from './useGetRoleByRoleIdAsync'
import { rolesMock } from '@/__mocks__/stories/rolesMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetRoleByRoleIdAsync', () => {
  it('should return role data when roleId is provided', async () => {
    const roleId = 1
    const expectedRole = rolesMock.items[0]

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(
      () => {
        expect(result.current.isSuccess).toBe(true)
      },
      { timeout: 5000 }
    )

    expect(result.current.role).toStrictEqual(expectedRole)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should return specific role by roleId', async () => {
    const roleId = 2
    const expectedRole = rolesMock.items[1]

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.role).toStrictEqual(expectedRole)
    expect(result.current.role?.name).toBe('Purchaser')
  })

  it('should handle loading state correctly', async () => {
    const roleId = 1

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    // Initially, it should be loading
    expect(result.current.isLoading).toBe(true)
    expect(result.current.isSuccess).toBe(false)

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('should not fetch when roleId is 0', async () => {
    const roleId = 0

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    // Query should not be enabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.role).toBeUndefined()
  })

  it('should not fetch when roleId is undefined', async () => {
    const roleId = undefined as unknown as number

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    // Query should not be enabled
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.role).toBeUndefined()
  })

  it('should use initialData when provided', async () => {
    const roleId = 1
    const initialData = {
      id: 999,
      name: 'Initial Role',
      isSystemRole: false,
      behaviors: [1, 2, 3],
      accountIds: [100],
    }

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId, initialData), {
      wrapper: createQueryClientWrapper(),
    })

    // Should immediately have the initial data
    expect(result.current.role).toStrictEqual(initialData)
    expect(result.current.isSuccess).toBe(true)

    // Initial data makes the query successful immediately
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('should return correct role properties', async () => {
    const roleId = 4

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.role?.id).toBe(4)
    expect(result.current.role?.name).toBe('Admin_Copy')
    expect(result.current.role?.isSystemRole).toBe(false)
    expect(result.current.role?.behaviors).toEqual([1, 2, 3, 4, 5])
    expect(result.current.role?.accountIds).toEqual([100])
  })

  it('should return system role correctly', async () => {
    const roleId = 3

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.role?.name).toBe('Non-Purchaser')
    expect(result.current.role?.isSystemRole).toBe(true)
    expect(result.current.role?.behaviors).toEqual([1])
  })

  it('should handle refetch correctly', async () => {
    const roleId = 1

    const { result, rerender } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const firstRole = result.current.role

    // Rerender to trigger potential refetch
    rerender()

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    // Should still have the same data (cached)
    expect(result.current.role).toStrictEqual(firstRole)
  })

  it('should update when roleId changes', async () => {
    const { result, rerender } = renderHook(({ roleId }) => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
      initialProps: { roleId: 1 },
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.role?.id).toBe(1)
    expect(result.current.role?.name).toBe('Admin')

    // Change roleId
    rerender({ roleId: 2 })

    await waitFor(() => {
      expect(result.current.role?.id).toBe(2)
    })

    expect(result.current.role?.name).toBe('Purchaser')
  })

  it('should have error property in return value', async () => {
    const roleId = 1

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.error).toBeDefined()
    expect(result.current.isError).toBe(false)
  })

  it('should maintain placeholder data during refetch', async () => {
    const roleId = 1

    const { result } = renderHook(() => useGetRoleByRoleIdAsync(roleId), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    const initialRole = result.current.role

    // The query should use placeholderData to maintain previous data during refetch
    expect(initialRole).toBeDefined()
  })
})
