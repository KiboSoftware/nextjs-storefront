/**
 * @module useGetRoleByRoleIdAsync
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
interface B2BRole {
  id?: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
  accountIds?: number[]
}

const getRoleByIdAsync = async ({ roleId }: any): Promise<B2BRole> => {
  const response = await client.request({
    document: getRoleByRoleIdAsyncQuery,
    variables: { roleId },
  })

  return response?.getRoleByRoleIdAsync
}

/**
 * [Query hook] useGetRoleByRoleIdAsync uses the graphQL query
 *
 * <b>getRoleByIdAsync(accountId: Int!, roleId: Int!): B2BRole</b>
 *
 * Description : Fetches a specific B2B role by accountId and roleId.
 *
 * Parameters passed to function getRoleByIdAsync({ accountId, roleId }) => expects accountId and roleId of type number.
 *
 * @returns 'response?.getRoleByIdAsync', which contains the role details.
 */

export const useGetRoleByRoleIdAsync = (roleId: number, initialData?: B2BRole) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: rolesKeys.roleById(roleId),
    queryFn: () => getRoleByIdAsync({ roleId }),
    enabled: !!roleId,
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

export default useGetRoleByRoleIdAsync
