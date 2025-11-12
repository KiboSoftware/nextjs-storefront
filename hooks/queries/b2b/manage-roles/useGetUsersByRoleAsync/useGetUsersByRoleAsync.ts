/**
 * @module useGetUsersByRoleAsync
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getUsersByRoleAsyncQuery } from '@/lib/gql/queries'
import { rolesKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

// Define the user role interface
export interface UserRole {
  roleId?: number
  roleName?: string
  roleTags?: string[]
}

// Define the B2B user interface based on the GraphQL response
export interface B2BUserByRole {
  emailAddress?: string
  userName?: string
  firstName?: string
  lastName?: string
  localeCode?: string
  userId?: string
  roles?: UserRole[]
  isLocked?: boolean
  isActive?: boolean
  isRemoved?: boolean
  acceptsMarketing?: boolean
  hasExternalPassword?: boolean
}

const getUsersByRoleAsync = async ({
  accountId,
  roleId,
}: {
  accountId: number
  roleId: number
}): Promise<B2BUserByRole[]> => {
  const response = await client.request({
    document: getUsersByRoleAsyncQuery,
    variables: { accountId, roleId },
  })

  return response?.getUsersByRoleAsync || []
}

/**
 * [Query hook] useGetUsersByRoleAsync uses the graphQL query
 *
 * <b>getUsersByRoleAsync(accountId: Int!, roleId: Int!): [B2BUser]</b>
 *
 * Description : Fetches all users assigned to a specific B2B role.
 *
 * Parameters passed to function getUsersByRoleAsync({ accountId, roleId }) => expects accountId and roleId of type number.
 *
 * @returns 'response?.getUsersByRoleAsync', which contains the list of users assigned to the role.
 */

export const useGetUsersByRoleAsync = (
  accountId: number,
  roleId: number,
  initialData?: B2BUserByRole[]
) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: rolesKeys.usersByRole(accountId, roleId),
    queryFn: () => getUsersByRoleAsync({ accountId, roleId }),
    enabled: !!accountId && !!roleId,
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
    retry: 0,
  })

  return {
    users: data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}

export default useGetUsersByRoleAsync
