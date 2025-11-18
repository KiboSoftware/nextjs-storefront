import { renderHook, waitFor } from '@testing-library/react'

import { useGetBehaviorCategories } from './useGetBehaviorCategories'
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

describe('[hooks] useGetBehaviorCategories', () => {
  const mockBehaviorCategories = {
    totalCount: 3,
    items: [
      { id: 1, name: 'Customer Management' },
      { id: 2, name: 'Order Management' },
      { id: 3, name: 'Product Management' },
    ],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  it('should fetch behavior categories successfully', async () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: mockBehaviorCategories,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories).toEqual(mockBehaviorCategories)
    expect(result.current.behaviorCategories?.totalCount).toBe(3)
    expect(result.current.behaviorCategories?.items).toHaveLength(3)
  })

  it('should be loading initially', () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: mockBehaviorCategories,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.isLoading).toBe(true)
    expect(result.current.behaviorCategories).toBeUndefined()
  })

  it('should handle error when fetching fails', async () => {
    const mockError = new Error('GraphQL Error: Failed to fetch behavior categories')
    mockRequest.mockRejectedValue(mockError)

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
    expect(result.current.behaviorCategories).toBeUndefined()
  })

  it('should use initialData when provided', () => {
    const initialData = {
      totalCount: 2,
      items: [
        { id: 1, name: 'Initial Category 1' },
        { id: 2, name: 'Initial Category 2' },
      ],
    }

    const { result } = renderHook(() => useGetBehaviorCategories(initialData), {
      wrapper: createQueryClientWrapper(),
    })

    expect(result.current.behaviorCategories).toEqual(initialData)
  })

  it('should call GraphQL client without parameters', async () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: mockBehaviorCategories,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
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

  it('should handle empty behavior categories list', async () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: {
        totalCount: 0,
        items: [],
      },
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories?.totalCount).toBe(0)
    expect(result.current.behaviorCategories?.items).toEqual([])
  })

  it('should handle response with null items', async () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: {
        totalCount: 0,
        items: null,
      },
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories?.items).toBeNull()
  })

  it('should handle large list of behavior categories', async () => {
    const largeCategoryList = {
      totalCount: 50,
      items: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Category ${i + 1}`,
      })),
    }

    mockRequest.mockResolvedValue({
      getBehaviorCategories: largeCategoryList,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories?.totalCount).toBe(50)
    expect(result.current.behaviorCategories?.items).toHaveLength(50)
  })

  it('should handle categories without names', async () => {
    const categoriesWithoutNames = {
      totalCount: 2,
      items: [{ id: 1 }, { id: 2 }],
    }

    mockRequest.mockResolvedValue({
      getBehaviorCategories: categoriesWithoutNames,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories?.items?.[0].name).toBeUndefined()
    expect(result.current.behaviorCategories?.items?.[1].name).toBeUndefined()
  })

  it('should handle network timeout error', async () => {
    const timeoutError = new Error('Network timeout')
    mockRequest.mockRejectedValue(timeoutError)

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Network timeout')
  })

  it('should handle unauthorized access error', async () => {
    const unauthorizedError = new Error('Unauthorized: Access denied')
    mockRequest.mockRejectedValue(unauthorizedError)

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error?.message).toContain('Unauthorized')
  })

  it('should handle null response', async () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: null,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories).toBeNull()
  })

  it('should handle undefined response', async () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: undefined,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    // React Query treats undefined as invalid data, so it won't reach success state
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 2000 })

    expect(result.current.behaviorCategories).toBeUndefined()
  })

  it('should maintain previous data with placeholderData', async () => {
    mockRequest.mockResolvedValue({
      getBehaviorCategories: mockBehaviorCategories,
    })

    const { result, rerender } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    const firstData = result.current.behaviorCategories

    rerender()

    expect(result.current.behaviorCategories).toEqual(firstData)
  })

  it('should handle categories with special characters in names', async () => {
    const specialCategories = {
      totalCount: 3,
      items: [
        { id: 1, name: 'Category & Special' },
        { id: 2, name: 'Category <Test>' },
        { id: 3, name: 'Category "Quoted"' },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviorCategories: specialCategories,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories?.items?.[0].name).toBe('Category & Special')
    expect(result.current.behaviorCategories?.items?.[1].name).toBe('Category <Test>')
    expect(result.current.behaviorCategories?.items?.[2].name).toBe('Category "Quoted"')
  })

  it('should handle mismatch between totalCount and items length', async () => {
    const mismatchedData = {
      totalCount: 10,
      items: [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
      ],
    }

    mockRequest.mockResolvedValue({
      getBehaviorCategories: mismatchedData,
    })

    const { result } = renderHook(() => useGetBehaviorCategories(), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.behaviorCategories?.totalCount).toBe(10)
    expect(result.current.behaviorCategories?.items).toHaveLength(2)
  })
})
