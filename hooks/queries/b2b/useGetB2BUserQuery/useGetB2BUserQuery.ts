/**
 * @module useGetB2BUserQuery
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCustomerB2BAccountUsersQuery } from '@/lib/gql/queries'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'
import { B2BUserResultType, QueryB2BUserArgs } from '@/lib/types/CustomerB2BUser'

import type { B2BAccountCollection, QueryB2bAccountUsersArgs } from '@/lib/gql/types'

/**
 * @hidden
 */

const client = makeGraphQLClient()

const loadCustomerB2BUsers = async ({
  accountId,
  filter,
  pageSize,
  startIndex,
  q,
}: QueryB2bAccountUsersArgs): Promise<B2BAccountCollection> => {
  const response = await client.request({
    document: getCustomerB2BAccountUsersQuery,
    variables: { b2bAccountId: accountId, filter, pageSize, startIndex, q },
  })

  return response?.b2bAccountUsers
}

/**
 * [Query hook] useGetB2BUserQueries uses the graphQL query
 *
 * <b>B2bAccountUsers({b2bAccountId: Int, filter: String, pageSize: Int, startIndex: Int, q: string}): ProductSearchResult</b>
 *
 * Description : Fetches the B2B Users list based on accountId, filter, pagesize, startIndex and q where q is the search query.
 *
 * Parameters passed to function loadCustomerB2BUsers({accountId, filter, pageSize, startIndex, q}: QueryB2bAccountUsersArgs) => expects object of type QueryB2bAccountUsersArgs containing accountId, filter, pagesize, startIndex and q.
 *
 * @returns 'response?.b2bAccountUsers', which contains list of B2B Users based on search request.
 */

export const useGetB2BUserQueries = ({
  accountId,
  filter,
  pageSize,
  startIndex,
  q,
}: QueryB2BUserArgs): B2BUserResultType => {
  const { isLoading, isSuccess, isError, error, data } = useQuery({
    queryKey: customerB2BUserKeys.search(accountId, startIndex, pageSize, q, filter),
    queryFn: () => loadCustomerB2BUsers({ accountId, filter, pageSize, startIndex, q }),
    enabled: !!accountId,
    placeholderData: (previousData) => previousData ?? undefined,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
