/**
 * @module useGetUsersRoleAsync
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { getUsersRoleAsyncQuery } from '@/lib/gql/queries'
import { rolesKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

// Define the AssignedInScope interface
export interface AssignedInScope {
  type?: string
  id?: string
  name?: string
}

// Define the UserRole interface based on the GraphQL response
export interface UserRole {
  userId?: string
  assignedInScope?: AssignedInScope
  roleId?: number
  roleName?: string
  roleTags?: string[]
}

// Define the response type for getUsersRoleAsync
export interface GetUsersRoleAsyncResponse {
  totalCount?: number
  items?: UserRole[]
}

interface UseGetUsersRoleAsyncParams {
  accountId: number
  userId: string
}

const getUsersRoleAsync = async ({
  accountId,
  userId,
}: UseGetUsersRoleAsyncParams): Promise<GetUsersRoleAsyncResponse> => {
  const response = await client.request({
    document: getUsersRoleAsyncQuery,
    variables: { accountId, userId },
  })

  return response?.getUsersRoleAsync
}

/**
 * [Query hook] useGetUsersRoleAsync uses the graphQL query
 *
 * <b>getUsersRoleAsync(accountId: Int!, userId: String!): GetUsersRoleAsyncResponse</b>
 *
 * Description : Fetches the user roles for a specific user in a B2B account.
 *
 * Parameters passed to function getUsersRoleAsync({ accountId, userId }) => expects accountId of type number and userId of type string.
 *
 * @returns 'response?.getUsersRoleAsync', which contains user role assignments with role details.
 */

export const useGetUsersRoleAsync = (
  accountId: number,
  userId: string,
  initialData?: GetUsersRoleAsyncResponse
) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: rolesKeys.usersRoleByUser(accountId, userId),
    queryFn: () => getUsersRoleAsync({ accountId, userId }),
    enabled: !!accountId && !!userId,
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
    retry: 0,
  })

  return {
    usersRole: data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}

export default useGetUsersRoleAsync
