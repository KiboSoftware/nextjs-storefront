/**
 * @module useAddUserRolesAsync
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { addUserRolesAsyncMutation } from '@/lib/gql/mutations'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClient()

interface AddUserRolesAsyncParams {
  accountId: number
  userId: string
  roleId: number
}

const addUserRolesAsync = async (params: AddUserRolesAsyncParams): Promise<boolean> => {
  const response = await client.request({
    document: addUserRolesAsyncMutation,
    variables: params,
  })

  return response?.addUserRolesAsync
}

/**
 * [Mutation hook] useAddUserRolesAsync uses the graphQL mutation
 *
 * <b>addUserRolesAsync(accountId: Int!, userId: String!, roleId: Int!): Boolean</b>
 *
 * Description : Assigns multiple roles to a B2B user for the specified account.
 *
 * Parameters passed to function addUserRolesAsync({ accountId, userId, roleId }) => expects accountId of type number, userId of type string, and roleId of type number.
 *
 * On success, calls invalidateQueries on b2bUsersKeys to refresh the users list.
 *
 * @returns 'response?.addUserRolesAsync', which indicates if the role assignment was successful.
 */

export const useAddUserRolesAsync = () => {
  const queryClient = useQueryClient()

  return {
    addUserRoles: useMutation({
      mutationFn: addUserRolesAsync,
      onSuccess: () => {
        // Invalidate the users list for all accounts
        queryClient.invalidateQueries({ queryKey: customerB2BUserKeys.all })
      },
    }),
  }
}
