import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutDestinationQuery, getCheckoutDestinationsQuery } from '@/lib/gql/queries'
import { checkoutDestinationKeys } from '@/lib/react-query/queryKeys'

import type { Order } from '@/lib/gql/types'
interface UseDestination {
  checkoutId: string
  destinationId?: string
}
export interface UseDestinationResponse {
  data: Order | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getCheckoutDestination = async (params: UseDestination) => {
  let query = getCheckoutDestinationsQuery
  if (params.destinationId) query = getCheckoutDestinationQuery
  const client = makeGraphQLClient()

  const response = await client.request({
    document: query,
    variables: { variables: params },
  })

  return response
}

export const useCheckoutDestinationQueries = (params: UseDestination): UseDestinationResponse => {
  const queryKey = params?.destinationId
    ? checkoutDestinationKeys.destinationId(params?.destinationId)
    : checkoutDestinationKeys.all

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(queryKey, () => getCheckoutDestination(params))

  return { data, isLoading, isSuccess }
}
