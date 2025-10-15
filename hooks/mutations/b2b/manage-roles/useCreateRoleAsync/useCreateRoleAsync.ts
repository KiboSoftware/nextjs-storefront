/**
 * @module useCreateRoleAsync
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { createRoleAsyncMutation } from '@/lib/gql/mutations'
import { rolesKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

// Define the B2BRole interface
export interface B2BRole {
  id: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
}

export interface B2BRoleInput {
  id: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
}

interface CreateRoleAsyncParams {
  accountId: number
  b2BRoleInput: B2BRoleInput
}

const createRoleAsync = async ({
  accountId,
  b2BRoleInput,
}: CreateRoleAsyncParams): Promise<B2BRole> => {
  const response = await client.request({
    document: createRoleAsyncMutation,
    variables: { accountId, b2BRoleInput },
  })

  return response?.createRoleAsync
}

/**
 * [Mutation hook] useCreateRoleAsync uses the graphQL mutation
 *
 * <b>createRoleAsync(accountId: Int!, b2BRoleInput: B2BRoleInput): B2BRole</b>
 *
 * Description : Creates a new B2B role for the specified account.
 *
 * Parameters passed to function createRoleAsync({ accountId, b2BRoleInput }) => expects accountId of type number and b2BRoleInput of type B2BRoleInput.
 *
 * On success, calls invalidateQueries on rolesKeys and fetches the updated result.
 *
 * @returns 'response?.createRoleAsync', which contains the created role details.
 */

export const useCreateRoleAsync = () => {
  const queryClient = useQueryClient()

  return {
    createRole: useMutation({
      mutationFn: createRoleAsync,
      onSuccess: (data, variables) => {
        // Invalidate the roles list for the specific account
        queryClient.invalidateQueries({ queryKey: rolesKeys.rolesByAccount(variables.accountId) })
        // Invalidate all roles queries
        queryClient.invalidateQueries({ queryKey: rolesKeys.all })
        // If the created role has an ID, set it in the cache
        if (data?.id) {
          queryClient.setQueryData(rolesKeys.roleById(variables.accountId, data.id), data)
        }
      },
    }),
  }
}

export default useCreateRoleAsync
