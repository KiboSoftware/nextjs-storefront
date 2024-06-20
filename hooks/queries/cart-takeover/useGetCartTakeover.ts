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
 * Description : Fetches the accessTokens for CSR based on secretId.
 *
 * Parameters passed to function getOneTimeSceretMethods(secretId: string) => expects secretId
 *
 * On success, returns the GetCartTakeoverResponse.
 *
 * @param secretId - string
 *
 * @returns 'response?.GetCartTakeover', which contains shipping methods based on secretI.
 */

export const useGetCartTakeover = (secretId: string): UseGetCartTakeoverResponse => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: cartTakeoverKeys.all,
    queryFn: () => getOneTimeSceretMethods(secretId),
  })

  return { data, isLoading, isSuccess }
}
