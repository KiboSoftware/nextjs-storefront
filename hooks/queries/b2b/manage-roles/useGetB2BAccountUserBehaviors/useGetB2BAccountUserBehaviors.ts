/**
 * @module useGetB2BAccountUserBehaviors
 */
import { useQuery, useQueries } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { b2bAccountUserBehaviorsQuery } from '@/lib/gql/queries'
import { behaviorsKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

// Define the parameters interface for single account
export interface GetB2BAccountUserBehaviorsParams {
  accountId: number
  userId: string
}

// Define the parameters interface for multiple accounts
export interface GetMultipleB2BAccountUserBehaviorsParams {
  accountIds: number[]
  userId: string
}

// Define the response type for b2bAccountUserBehaviors
export interface B2BAccountUserBehaviorsResponse {
  b2bAccountUserBehaviors?: number[]
}

// Define the combined response type for multiple accounts
export interface MultipleB2BAccountUserBehaviorsResponse {
  accountId: number
  behaviors: number[]
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: Error | null
}

const getB2BAccountUserBehaviors = async (
  params: GetB2BAccountUserBehaviorsParams
): Promise<B2BAccountUserBehaviorsResponse> => {
  const { accountId, userId } = params

  const response = await client.request({
    document: b2bAccountUserBehaviorsQuery,
    variables: { accountId, userId },
  })

  return response
}

/**
 * [Query hook] useGetB2BAccountUserBehaviors uses the graphQL query
 *
 * <b>b2bAccountUserBehaviors(accountId: Int!, userId: String!): [Int]</b>
 *
 * Description : Fetches the B2B account user behaviors for a single account based on accountId and userId.
 *
 * @param params - Object containing accountId and userId
 * @param initialData - Optional initial data for the query
 *
 * @returns 'response?.b2bAccountUserBehaviors', which contains list of behavior IDs.
 */
export const useGetB2BAccountUserBehaviors = (
  params: GetB2BAccountUserBehaviorsParams,
  initialData?: B2BAccountUserBehaviorsResponse
) => {
  const { accountId, userId } = params

  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: behaviorsKeys.accountUserBehaviors(accountId, userId),
    queryFn: () => getB2BAccountUserBehaviors(params),
    enabled: !!accountId && !!userId,
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
    retry: 0,
  })

  return {
    accountUserBehaviors: data?.b2bAccountUserBehaviors || [],
    isLoading,
    isError,
    isSuccess,
    error,
  }
}

/**
 * [Query hook] useGetMultipleB2BAccountUserBehaviors uses the graphQL query
 *
 * <b>b2bAccountUserBehaviors(accountId: Int!, userId: String!): [Int]</b>
 *
 * Description : Fetches the B2B account user behaviors for multiple accounts based on accountIds and userId.
 *
 * @param params - Object containing accountIds array and userId
 *
 * @returns Array of account behavior results with loading states.
 */
export const useGetMultipleB2BAccountUserBehaviors = (
  params: GetMultipleB2BAccountUserBehaviorsParams
) => {
  const { accountIds, userId } = params

  const results = useQueries({
    queries: accountIds.map((accountId) => ({
      queryKey: behaviorsKeys.accountUserBehaviors(accountId, userId),
      queryFn: () => getB2BAccountUserBehaviors({ accountId, userId }),
      enabled: !!accountId && !!userId,
      retry: 0,
    })),
  })

  const combinedResults: MultipleB2BAccountUserBehaviorsResponse[] = results.map(
    (result, index) => ({
      accountId: accountIds[index],
      behaviors: result.data?.b2bAccountUserBehaviors || [],
      isLoading: result.isLoading,
      isError: result.isError,
      isSuccess: result.isSuccess,
      error: result.error,
    })
  )

  const isLoading = results.some((result) => result.isLoading)
  const isError = results.some((result) => result.isError)
  const isSuccess = results.every((result) => result.isSuccess)

  // Flatten all behaviors from all accounts
  const allBehaviors = combinedResults.reduce((acc, result) => {
    return [...acc, ...result.behaviors]
  }, [] as number[])

  // Get unique behaviors
  const uniqueBehaviors = Array.from(new Set(allBehaviors))

  return {
    results: combinedResults,
    allBehaviors: uniqueBehaviors,
    isLoading,
    isError,
    isSuccess,
  }
}

export default useGetB2BAccountUserBehaviors
