/**
 * @module useGetB2BUserQuery
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { accountHierarchyKeys } from '@/lib/react-query/queryKeys'

import { AccountHierarchyResultType, B2BAccountHierarchyResult } from '@/lib/types'
import { getB2BAccountHierarchyQuery } from '@/lib/gql/queries'

/**
 * @hidden
 */

const client = makeGraphQLClient()

const getB2BAccountHierarchy = async (accountId: number): Promise<B2BAccountHierarchyResult> => {
  const response = await client.request({
    document: getB2BAccountHierarchyQuery,
    variables: { accountId },
  })

  return response?.getB2BAccountHierarchy
}

/**
 * [Query hook] useGetB2BAccountHierachyQueries uses the graphQL query
 *
 * <b>getB2BAccountHierarchy(accountId: Int): B2BAccountHierarchyResult</b>
 *
 * Description : Fetches the B2B accounts list based on accountId.
 *
 * Parameters passed to function getB2BAccountHierarchy(accountId: number) => expects accountId of type number.
 *
 * @returns 'response?.getB2BAccountHierarchy', which contains list of accounts.
 */

export const useGetB2BAccountHierachyQueries = (accountId: number): AccountHierarchyResultType => {
  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: accountHierarchyKeys.accountHierarchy(accountId),
    queryFn: () => getB2BAccountHierarchy(accountId),
    enabled: !!accountId,
  })

  return {
    b2BAccountHierarchy: data,
    isLoading,
    isError,
    isSuccess,
  }
}
