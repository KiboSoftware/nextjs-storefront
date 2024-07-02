/**
 * @module useRemoveUserFromGroup
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customerB2BUserKeys, groupsKeys } from '@/lib/react-query/queryKeys'
import type { UserGroupParam } from '@/lib/types'

const removeUserFromGroup = async (params: UserGroupParam) => {
  const response = await fetch('/api/remove-user-from-group', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  return await response.json()
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
        queryClient.invalidateQueries({ queryKey: [groupsKeys.all, customerB2BUserKeys.all] })
      },
    }),
  }
}
