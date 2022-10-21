import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getReturnsQuery } from '@/lib/gql/queries'
import { returnsKeys } from '@/lib/react-query/queryKeys'

import type { ReturnCollection, ReturnObj } from '@/lib/gql/types'

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
