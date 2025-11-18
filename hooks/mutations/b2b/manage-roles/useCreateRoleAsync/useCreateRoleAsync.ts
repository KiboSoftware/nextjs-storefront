/**
 * @module useCreateRoleAsync
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createRoleAsyncMutation } from '@/lib/gql/mutations'
import { rolesKeys } from '@/lib/react-query/queryKeys'
import { B2BRole, B2BRoleInput } from '@/lib/types/CustomerB2BAccount'

/**
 * @hidden
 */

const client = makeGraphQLClient()

interface CreateRoleAsyncParams {
  b2BRoleInput: B2BRoleInput
}

const createRoleAsync = async ({ b2BRoleInput }: CreateRoleAsyncParams): Promise<B2BRole> => {
  const response = await client.request({
    document: createRoleAsyncMutation,
    variables: { b2BRoleInput },
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
      onSuccess: () => {
        // Invalidate all roles queries
        queryClient.invalidateQueries({ queryKey: rolesKeys.all })
      },
    }),
  }
}
