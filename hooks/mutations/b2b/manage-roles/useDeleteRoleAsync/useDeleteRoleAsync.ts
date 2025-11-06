/**
 * @module useDeleteRoleAsync
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteRoleAsyncMutation } from '@/lib/gql/mutations'
import { rolesKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClient()

const deleteRoleAsync = async (roleId: any): Promise<boolean> => {
  const response = await client.request({
    document: deleteRoleAsyncMutation,
    variables: roleId,
  })

  return response?.deleteRoleAsync
}

/**
 * [Mutation hook] useDeleteRoleAsync uses the graphQL mutation
 *
 * <b>deleteRoleAsync(accountId: Int!, roleId: Int!): Boolean</b>
 *
 * Description : Deletes a B2B role for the specified account.
 *
 * Parameters passed to function deleteRoleAsync({ accountId, roleId }) => expects accountId and roleId of type number.
 *
 * On success, calls invalidateQueries on rolesKeys and removes the role from cache.
 *
 * @returns 'response?.deleteRoleAsync', which indicates if the deletion was successful.
 */

export const useDeleteRoleAsync = () => {
  const queryClient = useQueryClient()

  return {
    deleteRole: useMutation({
      mutationFn: deleteRoleAsync,
      onSuccess: (data, variables) => {
        // Invalidate the roles list for the specific account
        queryClient.invalidateQueries({ queryKey: rolesKeys.rolesByAccount(variables.roleId) })
        // Invalidate all roles queries
        queryClient.invalidateQueries({ queryKey: rolesKeys.all })
        // Remove the specific role from cache
        queryClient.removeQueries({
          queryKey: rolesKeys.roleById(variables.roleId),
        })
      },
    }),
  }
}
