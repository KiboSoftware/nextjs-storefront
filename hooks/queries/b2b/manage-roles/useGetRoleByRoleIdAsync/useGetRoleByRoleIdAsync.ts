/**
 * @module useGetRoleByIdAsync
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getRoleByRoleIdAsyncQuery } from '@/lib/gql/queries'
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
}

interface UseGetRoleByIdAsyncParams {
  accountId: number
  roleId: number
}

const getRoleByIdAsync = async ({
  accountId,
  roleId,
}: UseGetRoleByIdAsyncParams): Promise<B2BRole> => {
  const response = await client.request({
    document: getRoleByRoleIdAsyncQuery,
    variables: { accountId, roleId },
  })

  return response?.getRoleByRoleIdAsync
}

/**
 * [Query hook] useGetRoleByIdAsync uses the graphQL query
 *
 * <b>getRoleByIdAsync(accountId: Int!, roleId: Int!): B2BRole</b>
 *
 * Description : Fetches a specific B2B role by accountId and roleId.
 *
 * Parameters passed to function getRoleByIdAsync({ accountId, roleId }) => expects accountId and roleId of type number.
 *
 * @returns 'response?.getRoleByIdAsync', which contains the role details.
 */

export const useGetRoleByIdAsync = (accountId: number, roleId: number, initialData?: B2BRole) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: rolesKeys.roleById(accountId, roleId),
    queryFn: () => getRoleByIdAsync({ accountId, roleId }),
    enabled: !!accountId && !!roleId,
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
    retry: 0,
  })

  return {
    role: data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}

export default useGetRoleByIdAsync
