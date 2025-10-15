/**
 * @module useGetRolesAsync
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getRolesAsyncQuery } from '@/lib/gql/queries'
import { rolesKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

// Define the B2BRole interface based on the GraphQL fragment
export interface B2BRole {
  id?: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
}

// Define the response type for getRolesAsync
export interface GetRolesAsyncResponse {
  startIndex?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  items?: B2BRole[]
}

const getRolesAsync = async (accountId: number): Promise<GetRolesAsyncResponse> => {
  const response = await client.request({
    document: getRolesAsyncQuery,
    variables: { accountId },
  })

  return response?.getRolesAsync
}

/**
 * [Query hook] useGetRolesAsync uses the graphQL query
 *
 * <b>getRolesAsync(accountId: Int!): GetRolesAsyncResponse</b>
 *
 * Description : Fetches the B2B roles list based on accountId.
 *
 * Parameters passed to function getRolesAsync(accountId: number) => expects accountId of type number.
 *
 * @returns 'response?.getRolesAsync', which contains list of roles with pagination info.
 */

export const useGetRolesAsync = (accountId: number, initialData?: GetRolesAsyncResponse) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: rolesKeys.rolesByAccount(accountId),
    queryFn: () => getRolesAsync(accountId),
    enabled: !!accountId,
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
    retry: 0,
  })

  return {
    roles: data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}

export default useGetRolesAsync
