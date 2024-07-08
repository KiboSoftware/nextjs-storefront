/**
 * @module useGetGroups
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getGroups as getGroupsQuery } from '@/lib/gql/queries'
import { groupsKeys } from '@/lib/react-query/queryKeys'
/**
 * @hidden
 */

const getGroups = async () => {
  const client = makeGraphQLClientWithoutUserClaims()
  const response = await client.request({
    document: getGroupsQuery,
    variables: {},
  })
  return response?.getGroups
}

/**
 * [Query hook] useGetGroups uses the graphQL query
 *
 * <b>useGetGroups(): groups</b>
 *
 * Description : Fetches the list of groups associated with B2B account.
 *
 * Parameters passed to function useGetGroups(.
 *
 * @returns 'response?.useGetGroups', which contains list of groups.
 */

export const useGetGroups = (): any => {
  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: groupsKeys.all,
    queryFn: () => getGroups(),
  })

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  }
}
