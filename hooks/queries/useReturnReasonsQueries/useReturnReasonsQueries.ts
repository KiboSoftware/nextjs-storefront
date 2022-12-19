/**
 * @module useReturnReasonsQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getReturnReasonsQuery } from '@/lib/gql/queries'
import { returnReasonsKeys } from '@/lib/react-query/queryKeys'

import type { ReturnReason } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseReturnReasonsResponse {
  data?: ReturnReason
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const getReturnReasons = async (): Promise<ReturnReason> => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getReturnReasonsQuery,
    variables: {},
  })
  return response?.returnReasons?.items
}

/**
 * [Query hook] useReturnReasonsQueries uses the graphQL query
 *
 * <b>returnReasons: ReasonCollection</b>
 *
 * Description : Fetches the return reasons to be diplayed in dropdown menu. E.g; Damaged, defective, missing or late
 *
 * Parameters passed to function getReturnReasons()
 *
 * On success, returns with return reasons list and 'refetchOnWindowFocus' set to false for this react query
 *
 * @returns 'response?.returnReasons?.items', which contains list of return reason listed.
 */
export const useReturnReasonsQueries = (): UseReturnReasonsResponse => {
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    returnReasonsKeys.all,
    getReturnReasons,
    {
      refetchOnWindowFocus: false,
    }
  )

  return { data, isLoading, isSuccess, isFetching }
}
