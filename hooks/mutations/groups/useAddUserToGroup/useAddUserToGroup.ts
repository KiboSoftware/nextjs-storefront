/**
 * @module useAddUserToGroup
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'
import type { UserGroupParam } from '@/lib/types'

const addUserToGroup = async (params: UserGroupParam) => {
  const response = await fetch('/api/add-user-to-group', {
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
 * [Mutation hook] addUserToGroup uses the graphQL mutation
 *
 * <b>addUserToGroup($accountId: Int!, $userId: String!, $groupCode: String!): UserGroup</b>
 *
 * Description : add user to particular group
 *
 * Parameters passed to function addUserToGroup(params: UserGroup) => expects object of type 'AddUserToGroupParams' containing accountId,userId and groupCode
 *
 * On success, calls invalidateQueries on groupKeys and fetches the updated result
 *
 * @returns 'response?.addUserToGroup' which add user to group
 */
export const useAddUserToGroup = () => {
  const queryClient = useQueryClient()
  return {
    addUserToGroup: useMutation({
      mutationFn: addUserToGroup,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [customerB2BUserKeys.all] })
      },
    }),
  }
}
