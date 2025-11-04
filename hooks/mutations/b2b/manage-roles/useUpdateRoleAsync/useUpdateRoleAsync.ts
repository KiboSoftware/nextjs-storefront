/**
 * @module useUpdateRoleAsync
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { updateRoleAsyncMutation } from '@/lib/gql/mutations'
import { rolesKeys } from '@/lib/react-query/queryKeys'
import { B2BRole, B2BRoleInput } from '@/lib/types/CustomerB2BAccount'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

interface UpdateRoleAsyncParams {
  accountId: number
  roleId: number
  b2BRoleInput: B2BRoleInput
}

const updateRoleAsync = async ({
  accountId,
  roleId,
  b2BRoleInput,
}: UpdateRoleAsyncParams): Promise<B2BRole> => {
  const response = await client.request({
    document: updateRoleAsyncMutation,
    variables: { accountId, roleId, b2BRoleInput },
  })

  return response?.updateRoleAsync
}

/**
 * [Mutation hook] useUpdateRoleAsync uses the graphQL mutation
 *
 * <b>updateRoleAsync(accountId: Int!, roleId: Int!, b2BRoleInput: B2BRoleInput): B2BRole</b>
 *
 * Description : Updates an existing B2B role for the specified account.
 *
 * Parameters passed to function updateRoleAsync({ accountId, roleId, b2BRoleInput }) => expects accountId and roleId of type number and b2BRoleInput of type B2BRoleInput.
 *
 * On success, calls invalidateQueries on rolesKeys and updates the role in cache.
 *
 * @returns 'response?.updateRoleAsync', which contains the updated role details.
 */

export const useUpdateRoleAsync = () => {
  const queryClient = useQueryClient()

  return {
    updateRole: useMutation({
      mutationFn: updateRoleAsync,
      onSuccess: (data, variables) => {
        // Invalidate the roles list for the specific account
        queryClient.invalidateQueries({ queryKey: rolesKeys.rolesByAccount(variables.accountId) })
        // Invalidate all roles queries
        queryClient.invalidateQueries({ queryKey: rolesKeys.all })
        // Update the specific role in cache with the new data
        if (data?.id) {
          queryClient.setQueryData(rolesKeys.roleById(variables.accountId, variables.roleId), data)
        }
      },
    }),
  }
}
