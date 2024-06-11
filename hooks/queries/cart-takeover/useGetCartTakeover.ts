/**
 * @module useGetCartTakeover
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getOneTimeSecretQuery } from '@/lib/gql/queries'
import { cartTakeoverKeys } from '@/lib/react-query/queryKeys'
import { GetCartTakeoverResponse } from '@/lib/types'

/**
 * @hidden
 */
export interface UseGetCartTakeoverResponse {
  data: GetCartTakeoverResponse
  isLoading: boolean
  isSuccess: boolean
}

const getOneTimeSceretMethods = async (secretId: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getOneTimeSecretQuery,
    variables: secretId,
  })

  return response?.GetCartTakeover
}

/**
 * [Query hook] useGetCartTakeover uses the graphQL query
 *
 * <b>GetCartTakeover(secretId): [UseGetCartTakeoverResponse]</b>
 *
 * Description : Fetches the shipping methods based on quote id and draft.
 *
 * Parameters passed to function getOneTimeSceretMethods(secretId: string) => expects quoteId and draft
 *
 * On success, returns the received list of shipping methods.
 *
 * @param secretId - string
 *
 * @returns 'response?.GetCartTakeover', which contains shipping methods based on quoteId and draft request.
 */

export const useGetCartTakeover = (secretId: string): UseGetCartTakeoverResponse => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: cartTakeoverKeys.all,
    queryFn: () => getOneTimeSceretMethods(secretId),
    // cacheTime: 0,
  })

  return { data, isLoading, isSuccess }
}
