/**
 * @module useGetRolesByAccountIdAsync
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getRolesByAccountIdAsyncQuery } from '@/lib/gql/queries'
import { rolesKeys } from '@/lib/react-query/queryKeys'
/**
 * @hidden
 */
const client = makeGraphQLClient()
// Define the B2BRole interface based on the GraphQL fragment
export interface B2BRole {
  id?: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
  accountIds?: number[]
}
// Define the response type for getRolesAsync
export interface GetRolesAsyncResponse {
  startIndex?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  items?: B2BRole[]
}
const getRolesByAccountIdAsync = async (accountId: number): Promise<GetRolesAsyncResponse> => {
  const response = await client.request({
    document: getRolesByAccountIdAsyncQuery,
    variables: { accountId },
  })
  return response?.getRolesByAccountIdAsync
}
/**
 * [Query hook] useGetRolesByAccountIdAsync uses the graphQL query
 *
 * <b>getRolesAsync(accountId: Int!): GetRolesAsyncResponse</b>
 *
 * Description : Fetches the B2B roles list based on accountId.
 *
 * Parameters passed to function getRolesAsync(accountId: number) => expects accountId of type number.
 *
 * @returns 'response?.getRolesAsync', which contains list of roles with pagination info.
 */
export const useGetRolesByAccountIdAsync = (
  accountId: number,
  initialData?: GetRolesAsyncResponse,
  enabled = true
) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: rolesKeys.rolesByAccount(accountId),
    queryFn: () => getRolesByAccountIdAsync(accountId),
    enabled: !!accountId && enabled,
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
export default useGetRolesByAccountIdAsync
