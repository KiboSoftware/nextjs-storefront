/**
 * @module useGetQuoteShippingMethods
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getQuoteShippingMethodsQuery } from '@/lib/gql/queries'
import { quoteShippingMethodKeys } from '@/lib/react-query/queryKeys'

import type { CrShippingRate } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseQuoteShippingMethodsResponse {
  data: CrShippingRate[]
  isLoading: boolean
  isSuccess: boolean
}

const loadShippingMethods = async (quoteId: string, draft: boolean) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getQuoteShippingMethodsQuery,
    variables: { quoteId, draft },
  })

  return response?.getQuoteShippingMethods
}

/**
 * [Query hook] useGetQuoteShippingMethods uses the graphQL query
 *
 * <b>getQuoteShippingMethods(quoteId: String!, draft: Boolean): [ShippingRate]</b>
 *
 * Description : Fetches the shipping methods based on quote id and draft.
 *
 * Parameters passed to function loadShippingMethods(quoteId: string, draft: boolean) => expects quoteId and draft
 *
 * On success, returns the received list of shipping methods.
 *
 * @param quoteId and draft
 *
 * @returns 'response?.getQuoteShippingMethods', which contains shipping methods based on quoteId and draft request.
 */

export const useGetQuoteShippingMethods = ({
  quoteId,
  draft,
  enabled,
}: {
  quoteId: string
  draft: boolean
  enabled: boolean
}): UseQuoteShippingMethodsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: quoteShippingMethodKeys.all,
    queryFn: () => loadShippingMethods(quoteId, draft),
    // cacheTime: 0,
    enabled: !!enabled,
  })

  return { data, isLoading, isSuccess }
}
