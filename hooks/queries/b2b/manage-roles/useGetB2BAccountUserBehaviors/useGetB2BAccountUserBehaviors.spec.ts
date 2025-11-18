import { renderHook, waitFor } from '@testing-library/react'

import {
  useGetB2BAccountUserBehaviors,
  useGetMultipleB2BAccountUserBehaviors,
} from './useGetB2BAccountUserBehaviors'
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

describe('[hooks] useGetB2BAccountUserBehaviors', () => {
  const mockAccountId = 1001
  const mockUserId = 'user123'
  const mockBehaviors = [1, 2, 3, 5, 7, 9, 10]

  beforeEach(() => {
    jest.clearAllMocks()
    mockRequest.mockReset()
  })

  describe('useGetB2BAccountUserBehaviors - Single Account', () => {
    it('should fetch account user behaviors successfully', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: mockBehaviors,
      })

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
      expect(result.current.accountUserBehaviors).toEqual(mockBehaviors)
    })

    it('should be loading initially', () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: mockBehaviors,
      })

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      expect(result.current.isLoading).toBe(true)
    })

    it('should handle error when fetching fails', async () => {
      const mockError = new Error('GraphQL Error: Failed to fetch behaviors')
      mockRequest.mockRejectedValue(mockError)

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isError).toBe(true))
      expect(result.current.error).toBeDefined()
    })

    it('should not fetch when accountId is not provided', () => {
      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: 0,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      expect(result.current.isLoading).toBe(false)
      expect(result.current.accountUserBehaviors).toEqual([])
    })

    it('should not fetch when userId is not provided', () => {
      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: '',
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      expect(result.current.isLoading).toBe(false)
      expect(result.current.accountUserBehaviors).toEqual([])
    })

    it('should use initialData when provided', () => {
      const initialData = {
        b2bAccountUserBehaviors: [1, 2, 3],
      }

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors(
            {
              accountId: mockAccountId,
              userId: mockUserId,
            },
            initialData
          ),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      expect(result.current.accountUserBehaviors).toEqual([1, 2, 3])
    })

    it('should call GraphQL client with correct variables', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: mockBehaviors,
      })

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

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

    it('should return empty array when no behaviors found', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: [],
      })

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
      expect(result.current.accountUserBehaviors).toEqual([])
    })

    it('should return empty array when response is null', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: null,
      })

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
      expect(result.current.accountUserBehaviors).toEqual([])
    })

    it('should handle large behavior list', async () => {
      const largeBehaviorList = Array.from({ length: 100 }, (_, i) => i + 1)
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: largeBehaviorList,
      })

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
      expect(result.current.accountUserBehaviors).toHaveLength(100)
    })

    it('should handle unauthorized access error', async () => {
      const mockError = new Error('Unauthorized: Access denied')
      mockRequest.mockRejectedValue(mockError)

      const { result } = renderHook(
        () =>
          useGetB2BAccountUserBehaviors({
            accountId: mockAccountId,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isError).toBe(true))
      expect(result.current.error?.message).toContain('Unauthorized')
    })
  })

  describe('useGetMultipleB2BAccountUserBehaviors - Multiple Accounts', () => {
    const mockAccountIds = [1001, 1002, 1003]
    const mockBehaviorsAccount1 = [1, 2, 3]
    const mockBehaviorsAccount2 = [5, 7, 9]
    const mockBehaviorsAccount3 = [10, 11, 13]

    it('should fetch behaviors for multiple accounts successfully', async () => {
      mockRequest
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: mockBehaviorsAccount1 })
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: mockBehaviorsAccount2 })
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: mockBehaviorsAccount3 })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: mockAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.results).toHaveLength(3)
      expect(result.current.results[0].behaviors).toEqual(mockBehaviorsAccount1)
      expect(result.current.results[1].behaviors).toEqual(mockBehaviorsAccount2)
      expect(result.current.results[2].behaviors).toEqual(mockBehaviorsAccount3)
    })

    it('should return unique behaviors from all accounts', async () => {
      mockRequest
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: [1, 2, 3] })
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: [2, 3, 5] })
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: [3, 5, 7] })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: mockAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.allBehaviors).toEqual([1, 2, 3, 5, 7])
    })

    it('should show loading state when any query is loading', async () => {
      mockRequest.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve({ b2bAccountUserBehaviors: [1, 2, 3] }), 100)
          })
      )

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: mockAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      expect(result.current.isLoading).toBe(true)

      await waitFor(() => expect(result.current.isSuccess).toBe(true))
      expect(result.current.isLoading).toBe(false)
    })

    it('should show error state when any query fails', async () => {
      const mockError = new Error('Failed to fetch')
      mockRequest
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: [1, 2, 3] })
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce({ b2bAccountUserBehaviors: [5, 7, 9] })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: mockAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isError).toBe(true))

      expect(result.current.results[1].isError).toBe(true)
      expect(result.current.results[1].error).toBeDefined()
    })

    it('should handle empty account IDs array', () => {
      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: [],
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      expect(result.current.results).toEqual([])
      expect(result.current.allBehaviors).toEqual([])
      expect(result.current.isSuccess).toBe(true)
    })

    it('should handle single account ID in array', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: [1, 2, 3],
      })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: [1001],
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.results).toHaveLength(1)
      expect(result.current.allBehaviors).toEqual([1, 2, 3])
    })

    it('should make individual calls for each account', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: [1, 2, 3],
      })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: mockAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(mockRequest).toHaveBeenCalledTimes(3)
      expect(mockRequest).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          variables: { accountId: 1001, userId: mockUserId },
        })
      )
      expect(mockRequest).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          variables: { accountId: 1002, userId: mockUserId },
        })
      )
      expect(mockRequest).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          variables: { accountId: 1003, userId: mockUserId },
        })
      )
    })

    it('should handle empty behaviors from all accounts', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: [],
      })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: mockAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.allBehaviors).toEqual([])
      expect(result.current.results.every((r) => r.behaviors.length === 0)).toBe(true)
    })

    it('should include accountId in each result', async () => {
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: [1, 2, 3],
      })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: mockAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.results[0].accountId).toBe(1001)
      expect(result.current.results[1].accountId).toBe(1002)
      expect(result.current.results[2].accountId).toBe(1003)
    })

    it('should handle large number of accounts', async () => {
      const manyAccountIds = Array.from({ length: 20 }, (_, i) => 1000 + i)
      mockRequest.mockResolvedValue({
        b2bAccountUserBehaviors: [1, 2, 3],
      })

      const { result } = renderHook(
        () =>
          useGetMultipleB2BAccountUserBehaviors({
            accountIds: manyAccountIds,
            userId: mockUserId,
          }),
        {
          wrapper: createQueryClientWrapper(),
        }
      )

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.results).toHaveLength(20)
      expect(mockRequest).toHaveBeenCalledTimes(20)
    })
  })
})
