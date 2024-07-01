/**
 * @module useGetGroups
 */
import { useQuery } from '@tanstack/react-query'

import { groupsKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const getGroups = async () => {
  const response = await fetch('/api/get-groups', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  })

  return await response.json()
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
