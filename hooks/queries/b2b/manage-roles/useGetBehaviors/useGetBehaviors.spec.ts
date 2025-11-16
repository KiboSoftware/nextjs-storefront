import { renderHook, waitFor } from '@testing-library/react'

import { useGetBehaviors } from './useGetBehaviors'
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

describe('[hooks] useGetBehaviors', () => {
  const mockBehaviors = {
    totalCount: 3,
    items: [
      {
        id: 1,
        categoryId: 10,
        name: 'View Orders',
        requiresBehaviorIds: [],
        validUserTypes: ['B2B'],
        isPrivate: false,
        systemRoles: ['Admin'],
      },
      {
        id: 2,
        categoryId: 10,
        name: 'Create Orders',
        requiresBehaviorIds: [1],
        validUserTypes: ['B2B', 'B2C'],
        isPrivate: false,
        systemRoles: ['Admin', 'Manager'],
      },
      {
        id: 3,
        categoryId: 20,
        name: 'Delete Orders',
        requiresBehaviorIds: [1, 2],
        validUserTypes: ['B2B'],
        isPrivate: true,
        systemRoles: ['Admin'],
      },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should fetch behaviors successfully', async () => {
    mockRequest.mockResolvedValue({
      getBehaviors: mockBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors).toEqual(mockBehaviors)
    expect(result.current.behaviors?.totalCount).toBe(3)
    expect(result.current.behaviors?.items).toHaveLength(3)
  })

  it('should be loading initially', () => {
    mockRequest.mockResolvedValue({
      getBehaviors: mockBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.behaviors).toBeUndefined()
  })

  it('should handle error when fetching fails', async () => {
    const mockError = new Error('GraphQL Error: Failed to fetch behaviors')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.behaviors).toBeUndefined()
  })

  it('should use initialData when provided', () => {
    const initialData = {
      totalCount: 1,
      items: [
        {
          id: 1,
          categoryId: 5,
          name: 'Initial Behavior',
          requiresBehaviorIds: [],
          validUserTypes: ['B2B'],
          isPrivate: false,
          systemRoles: ['Admin'],
        },
      ],
    }

    const { result } = renderHook(() => useGetBehaviors(initialData), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.behaviors).toEqual(initialData)
  })

  it('should call GraphQL client without parameters', async () => {
    mockRequest.mockResolvedValue({
      getBehaviors: mockBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        document: expect.anything(),
      })
    )
    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should handle empty behaviors list', async () => {
    mockRequest.mockResolvedValue({
      getBehaviors: {
        totalCount: 0,
        items: [],
      },
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.totalCount).toBe(0)
    expect(result.current.behaviors?.items).toEqual([])
  })

  it('should handle behaviors with all optional fields', async () => {
    const behaviorsWithAllFields = {
      totalCount: 1,
      items: [
        {
          id: 1,
          categoryId: 10,
          name: 'Complete Behavior',
          requiresBehaviorIds: [5, 6, 7],
          validUserTypes: ['B2B', 'B2C', 'Internal'],
          isPrivate: true,
          systemRoles: ['Admin', 'Manager', 'Supervisor'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: behaviorsWithAllFields,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.items?.[0].requiresBehaviorIds).toEqual([5, 6, 7])
    expect(result.current.behaviors?.items?.[0].validUserTypes).toEqual(['B2B', 'B2C', 'Internal'])
    expect(result.current.behaviors?.items?.[0].systemRoles).toEqual([
      'Admin',
      'Manager',
      'Supervisor',
    ])
  })

  it('should handle behaviors with minimal fields', async () => {
    const minimalBehaviors = {
      totalCount: 2,
      items: [{ id: 1 }, { id: 2 }],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: minimalBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.items?.[0].id).toBe(1)
    expect(result.current.behaviors?.items?.[0].name).toBeUndefined()
    expect(result.current.behaviors?.items?.[0].categoryId).toBeUndefined()
  })

  it('should handle large list of behaviors', async () => {
    const largeBehaviorList = {
      totalCount: 100,
      items: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        categoryId: Math.floor(i / 10) + 1,
        name: `Behavior ${i + 1}`,
        requiresBehaviorIds: [],
        validUserTypes: ['B2B'],
        isPrivate: false,
        systemRoles: ['Admin'],
      })),
    }

    mockRequest.mockResolvedValue({
      getBehaviors: largeBehaviorList,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.totalCount).toBe(100)
    expect(result.current.behaviors?.items).toHaveLength(100)
  })

  it('should handle behaviors with empty requiresBehaviorIds', async () => {
    const behaviorsWithEmptyRequires = {
      totalCount: 1,
      items: [
        {
          id: 1,
          name: 'Independent Behavior',
          requiresBehaviorIds: [],
          validUserTypes: ['B2B'],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: behaviorsWithEmptyRequires,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.items?.[0].requiresBehaviorIds).toEqual([])
  })

  it('should handle network timeout error', async () => {
    const timeoutError = new Error('Network timeout')
    mockRequest.mockRejectedValue(timeoutError)

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Network timeout')
  })

  it('should handle unauthorized access error', async () => {
    const unauthorizedError = new Error('Unauthorized: Access denied')
    mockRequest.mockRejectedValue(unauthorizedError)

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Unauthorized')
  })

  it('should handle null response', async () => {
    mockRequest.mockResolvedValue({
      getBehaviors: null,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors).toBeNull()
  })

  it('should handle undefined response', async () => {
    mockRequest.mockResolvedValue({
      getBehaviors: undefined,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    // React Query treats undefined as invalid data, so it won't reach success state
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 2000 })

    expect(result.current.behaviors).toBeUndefined()
  })

  it('should not retry on error due to retry: 0 config', async () => {
    const mockError = new Error('Fetch failed')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockRequest).toHaveBeenCalledTimes(1)
  })

  it('should maintain previous data with placeholderData', async () => {
    mockRequest.mockResolvedValue({
      getBehaviors: mockBehaviors,
    })

    const { result, rerender } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const firstData = result.current.behaviors

    rerender()

    expect(result.current.behaviors).toEqual(firstData)
  })

  it('should handle behaviors with special characters in names', async () => {
    const specialBehaviors = {
      totalCount: 3,
      items: [
        { id: 1, name: 'Behavior & Special' },
        { id: 2, name: 'Behavior <Test>' },
        { id: 3, name: 'Behavior "Quoted"' },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: specialBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.items?.[0].name).toBe('Behavior & Special')
    expect(result.current.behaviors?.items?.[1].name).toBe('Behavior <Test>')
    expect(result.current.behaviors?.items?.[2].name).toBe('Behavior "Quoted"')
  })

  it('should handle behaviors with multiple dependencies', async () => {
    const dependentBehaviors = {
      totalCount: 1,
      items: [
        {
          id: 10,
          name: 'Complex Behavior',
          requiresBehaviorIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: dependentBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.items?.[0].requiresBehaviorIds).toHaveLength(9)
  })

  it('should handle behaviors with isPrivate flag variations', async () => {
    const privateBehaviors = {
      totalCount: 3,
      items: [
        { id: 1, name: 'Public Behavior', isPrivate: false },
        { id: 2, name: 'Private Behavior', isPrivate: true },
        { id: 3, name: 'Undefined Privacy' },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: privateBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.items?.[0].isPrivate).toBe(false)
    expect(result.current.behaviors?.items?.[1].isPrivate).toBe(true)
    expect(result.current.behaviors?.items?.[2].isPrivate).toBeUndefined()
  })

  it('should handle mismatch between totalCount and items length', async () => {
    const mismatchedData = {
      totalCount: 50,
      items: [
        { id: 1, name: 'Behavior 1' },
        { id: 2, name: 'Behavior 2' },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: mismatchedData,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviors?.totalCount).toBe(50)
    expect(result.current.behaviors?.items).toHaveLength(2)
  })

  it('should handle behaviors grouped by different categories', async () => {
    const categorizedBehaviors = {
      totalCount: 6,
      items: [
        { id: 1, categoryId: 10, name: 'Category 10 - Behavior 1' },
        { id: 2, categoryId: 10, name: 'Category 10 - Behavior 2' },
        { id: 3, categoryId: 20, name: 'Category 20 - Behavior 1' },
        { id: 4, categoryId: 20, name: 'Category 20 - Behavior 2' },
        { id: 5, categoryId: 30, name: 'Category 30 - Behavior 1' },
        { id: 6, categoryId: 30, name: 'Category 30 - Behavior 2' },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviors: categorizedBehaviors,
    })

    const { result } = renderHook(() => useGetBehaviors(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const categories = new Set(result.current.behaviors?.items?.map((b) => b.categoryId))
    expect(categories.size).toBe(3)
    expect(categories.has(10)).toBe(true)
    expect(categories.has(20)).toBe(true)
    expect(categories.has(30)).toBe(true)
  })
})
