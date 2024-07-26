/**
 * @module useRemoveUserFromGroup
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { removeUserFromGroupMutation } from '@/lib/gql/mutations'
import { customerB2BUserKeys, groupsKeys } from '@/lib/react-query/queryKeys'
import type { UserGroupCode } from '@/lib/types'

const removeUserFromGroup = async (params: UserGroupCode): Promise<boolean> => {
  const client = makeGraphQLClientWithoutUserClaims()
  const { accountId, userId, groupCode } = params
  const variables = { accountId, userId, groupCode }
  const response = await client.request({
    document: removeUserFromGroupMutation,
    variables,
  })
  return response?.removeUserFromGroup
}

/**
 * [Mutation hook] removeUserFromGroup uses the graphQL mutation
 *
 * <b>removeUserFromGroup($accountId: Int!, $userId: String!, $groupCode: String!): Boolean</b>
 *
 * Description : remove user from particular group
 *
 * Parameters passed to function removeUserFromGroup(params: UserGroup) => expects object of type 'RemoveUserFromGroupParams' containing accountId,userId and groupCode
 *
 * On success, calls invalidateQueries on groupKeys and fetches the updated result
 *
 * @returns 'response?.removeUserFromGroup' which remove user from group
 */
export const useRemoveUserFromGroup = () => {
  const queryClient = useQueryClient()
  return {
    removeUserFromGroup: useMutation({
      mutationFn: removeUserFromGroup,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [customerB2BUserKeys.all] })
      },
    }),
  }
}
