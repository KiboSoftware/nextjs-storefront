/**
 * @module useAddUserToGroup
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { addUserToGroupMutation } from '@/lib/gql/mutations'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'
import type { UserGroupCode } from '@/lib/types'

import { UserGroup } from '@/lib/gql/types'

const addUserToGroup = async ({
  accountId,
  userId,
  groupCode,
}: UserGroupCode): Promise<UserGroup> => {
  const client = makeGraphQLClientWithoutUserClaims()
  const variables = { accountId, userId, groupCode }
  const response = await client.request({
    document: addUserToGroupMutation,
    variables,
  })
  return response?.addUserToGroup
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
