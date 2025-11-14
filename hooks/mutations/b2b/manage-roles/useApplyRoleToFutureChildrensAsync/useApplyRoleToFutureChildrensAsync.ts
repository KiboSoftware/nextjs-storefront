/**
 * @module useApplyRoleToFutureChildrensAsync
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { applyRoleToFutureChildrensAsyncMutation } from '@/lib/gql/mutations'
import { rolesKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClient()

interface ApplyRoleToFutureChildrensAsyncParams {
  roleId: number
  accountId: number
  enabled?: boolean
}

const applyRoleToFutureChildrensAsync = async ({
  roleId,
  accountId,
  enabled,
}: ApplyRoleToFutureChildrensAsyncParams): Promise<boolean> => {
  const response = await client.request({
    document: applyRoleToFutureChildrensAsyncMutation,
    variables: { roleId, accountId, enabled },
  })

  return response?.applyRoleToFutureChildrensAsync
}

/**
 * [Mutation hook] useApplyRoleToFutureChildrensAsync uses the graphQL mutation
 *
 * <b>applyRoleToFutureChildrensAsync(roleId: Int!, accountId: Int!, enabled: Boolean): Boolean</b>
 *
 * Description : Applies or removes a role to/from future children of the specified account.
 *
 * Parameters passed to function applyRoleToFutureChildrensAsync({ roleId, accountId, enabled }) => expects roleId and accountId of type number and optional enabled of type boolean.
 *
 * On success, calls invalidateQueries on rolesKeys to refresh the roles data.
 *
 * @returns 'response?.applyRoleToFutureChildrensAsync', which indicates success (boolean).
 */

export const useApplyRoleToFutureChildrensAsync = () => {
  const queryClient = useQueryClient()

  return {
    applyRoleToFutureChildren: useMutation({
      mutationFn: applyRoleToFutureChildrensAsync,
      onSuccess: (data, variables) => {
        // Invalidate the roles list for the specific account
        queryClient.invalidateQueries({ queryKey: rolesKeys.rolesByAccount(variables.accountId) })
        // Invalidate all roles queries
        queryClient.invalidateQueries({ queryKey: rolesKeys.all })
      },
    }),
  }
}
