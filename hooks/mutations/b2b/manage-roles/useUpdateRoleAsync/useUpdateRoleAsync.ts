/**
 * @module useUpdateRoleAsync
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateRoleAsyncMutation } from '@/lib/gql/mutations'
import { rolesKeys } from '@/lib/react-query/queryKeys'
import { B2BRole, B2BRoleInput } from '@/lib/types/CustomerB2BAccount'

/**
 * @hidden
 */

const client = makeGraphQLClient()

interface UpdateRoleAsyncParams {
  roleId: number
  b2BRoleInput: B2BRoleInput
}

const updateRoleAsync = async ({
  roleId,
  b2BRoleInput,
}: UpdateRoleAsyncParams): Promise<B2BRole> => {
  const response = await client.request({
    document: updateRoleAsyncMutation,
    variables: { roleId, b2BRoleInput },
  })

  return response?.updateRoleAsync
}

/**
 * [Mutation hook] useUpdateRoleAsync uses the graphQL mutation
 *
 * <b>updateRoleAsync(roleId: Int!, b2BRoleInput: B2BRoleInput): B2BRole</b>
 *
 * Description : Updates an existing B2B role.
 *
 * Parameters passed to function updateRoleAsync({ roleId, b2BRoleInput }) => expects roleId of type number and b2BRoleInput of type B2BRoleInput.
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
        // Invalidate all roles queries
        queryClient.invalidateQueries({ queryKey: rolesKeys.all })
        // Update the specific role in cache with the new data
        if (data?.id) {
          queryClient.setQueryData(rolesKeys.roleById(variables.roleId), data)
        }
      },
    }),
  }
}
