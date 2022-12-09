import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutDestinationQuery } from '@/lib/gql/queries'
import { checkoutDestinationKeys } from '@/lib/react-query/queryKeys'

import type { CrDestination } from '@/lib/gql/types'
interface UseDestination {
  checkoutId: string
  destinationId: string
}
export interface UseDestinationResponse {
  data: CrDestination
  isLoading: boolean
  isSuccess: boolean
}

const getCheckoutDestination = async (params: UseDestination) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getCheckoutDestinationQuery,
    variables: params,
  })

  return response?.checkoutDestination
}

export const useCheckoutDestinationQueries = (params: UseDestination): UseDestinationResponse => {
  const destinationId = params?.destinationId as string
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutDestinationKeys.destinationId(destinationId), () =>
    getCheckoutDestination(params)
  )

  return { data, isLoading, isSuccess }
}
