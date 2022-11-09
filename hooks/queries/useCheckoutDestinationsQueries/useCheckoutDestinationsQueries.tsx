import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutDestinationsQuery } from '@/lib/gql/queries'
import { checkoutDestinationKeys } from '@/lib/react-query/queryKeys'

import type { Destination } from '@/lib/gql/types'
interface UseDestinations {
  checkoutId: string
}
export interface UseDestinationsResponse {
  data: Destination[]
  isLoading: boolean
  isSuccess: boolean
}

const getCheckoutDestinations = async (params: UseDestinations) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getCheckoutDestinationsQuery,
    variables: params,
  })

  return response?.checkoutDestinations
}

export const useCheckoutDestinationsQueries = (
  params: UseDestinations
): UseDestinationsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutDestinationKeys.all, () => getCheckoutDestinations(params))

  return { data, isLoading, isSuccess }
}
