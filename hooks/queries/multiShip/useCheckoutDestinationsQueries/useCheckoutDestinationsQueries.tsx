/**
 * @module useCheckoutDestinationsQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutDestinationsQuery } from '@/lib/gql/queries'
import { checkoutDestinationKeys } from '@/lib/react-query/queryKeys'

import type { CrDestination } from '@/lib/gql/types'
interface UseDestinations {
  checkoutId: string
}

/**
 * @hidden
 */
export interface UseDestinationsResponse {
  data: CrDestination[]
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

/**
 * [Query hook] useCheckoutDestinationsQueries uses the graphQL query
 *
 * <b>checkoutDestinations(checkoutId: String!): [CrDestination]</b>
 *
 * Description : Gets all the destinations specified by the checkout Id.
 *
 * Parameters passed to function getCheckoutDestinations(params: UseDestinations) => expects checkoutId
 *
 * @param params stores checkoutId
 *
 * @returns 'response?.checkoutDestinations' which contains all the destinations of the specified checkout Id
 */
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
