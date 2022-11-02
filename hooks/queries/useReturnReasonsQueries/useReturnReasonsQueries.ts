import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getReturnReasonsQuery } from '@/lib/gql/queries'
import { returnReasonsKeys } from '@/lib/react-query/queryKeys'

import type { ReturnReason } from '@/lib/gql/types'

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
