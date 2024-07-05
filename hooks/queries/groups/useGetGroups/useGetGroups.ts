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
