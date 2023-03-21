/**
 * @module useCheckoutDestinationQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutDestinationQuery } from '@/lib/gql/queries'
import { checkoutDestinationKeys } from '@/lib/react-query/queryKeys'

import type { CrDestination } from '@/lib/gql/types'
interface UseDestination {
  checkoutId: string
  destinationId: string
}

/**
 * @hidden
 */
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

/**
 * [Query hook] useCheckoutDestinationQueries uses the graphQL query
 *
 * <b>checkoutDestination(checkoutId: String!, destinationId: String!): CrDestination</b>
 *
 * Description : Gets a destination specified by the checkout Id and destination Id.
 *
 * Parameters passed to function getCheckoutDestination(params: UseDestination) => expects checkoutId and destinationId
 *
 * @param params stores checkoutId and destinationId
 *
 * @returns 'response?.checkoutDestination' which contains destination of the specified destinationId
 */
export const useCheckoutDestinationQueries = (params: UseDestination): UseDestinationResponse => {
  const destinationId = params?.destinationId
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutDestinationKeys.destinationId(destinationId), () =>
    getCheckoutDestination(params)
  )

  return { data, isLoading, isSuccess }
}
