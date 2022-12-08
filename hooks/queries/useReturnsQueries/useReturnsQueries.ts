/**
 * @module useReturnsQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getReturnsQuery } from '@/lib/gql/queries'
import { returnsKeys } from '@/lib/react-query/queryKeys'

import type { ReturnCollection } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseReturnsResponse {
  data?: ReturnCollection
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const getReturns = async (param: { filter: string }): Promise<ReturnCollection> => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getReturnsQuery,
    variables: param,
  })

  return response?.returns
}

/**
 * [Query hook] useReturnsQueries uses the graphQL query
 *
 * <b>returns(startIndex: Int, pageSize: Int, sortBy: String, filter: String, q: String): ReturnCollection</b>
 *
 * Description : Fetches the list of items returned with reasons and return type.
 *
 * Parameters passed to function getReturns(param: { filter: string }) => can be used to filter out the results for return items
 *
 * On success, returns items that are returned and 'refetchOnWindowFocus' set to false for this react query
 *
 * @param searchParams can be used to filter out the results
 *
 * @returns 'response?.returns', which contains list of items returned
 */

export const useReturnsQueries = (searchParams: { filter: string }): UseReturnsResponse => {
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    returnsKeys.all,
    () => getReturns(searchParams),
    {
      refetchOnWindowFocus: false,
    }
  )

  return { data, isLoading, isSuccess, isFetching }
}
