/**
 * @module useChangeB2bAccountParentMutation
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { changeB2bAccountParentMutation } from '@/lib/gql/mutations'
import { accountHierarchyKeys } from '@/lib/react-query/queryKeys'

import { MutationChangeB2bAccountParentArgs } from '@/lib/gql/types'

const client = makeGraphQLClient()

const changeB2bAccountParent = async ({
  accountId,
  parentAccountId,
}: MutationChangeB2bAccountParentArgs) => {
  const response = await client.request({
    document: changeB2bAccountParentMutation,
    variables: { accountId, parentAccountId },
  })
  return response?.changeB2bAccountParent
}

/**
 * [Mutation hook] useChangeB2bAccountParentMutation uses the graphQL mutation
 *
 * <b>changeB2bAccountParentUser(accountInput: Int!, parentAccountId: Int!): B2BAccount</b>
 *
 * Description : Update parent of child account in a hierarchy
 *
 * Parameters passed to function changeB2bAccountParent({accountId,parentAccountId}: MutationChangeB2bAccountParentArgs) => expects object of type 'MutationChangeB2bAccountParentArgs' containing accountId and parentAccountId
 *
 * On success, calls invalidateQueries on accountHierarchyKeys and fetches account hierarchy.
 *
 * @returns 'response?.data?.changeB2bAccountParent' which contains object of account added
 */

export const useChangeB2bAccountParentMutation = (id: number) => {
  const queryClient = useQueryClient()
  return {
    changeB2bAccountParent: useMutation({
      mutationFn: changeB2bAccountParent,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: accountHierarchyKeys.accountHierarchy(id) }),
    }),
  }
}
