/**
 * @module useDeleteB2bAccountRoleMutation
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

// import { deleteB2bAccountRole } from '@/lib/gql/types'
import { deleteB2bAccountRoleMutation } from '@/lib/gql/mutations'

const client = makeGraphQLClient()

const deleteB2bAccountUserRole = async (deleteB2bAccountRole: any) => {
  const response = await client.request({
    document: deleteB2bAccountRoleMutation,
    variables: deleteB2bAccountRole,
  })
  return response?.deleteB2bAccountRole
}

/**
 * [Mutation hook] useDeleteB2bAccountRoleMutation uses the graphQL mutation
 *
 * <b>deleteB2bAccountUserRole(accountId: Int!, userId: Int!, roleId: Number!): B2BUser</b>
 *
 * Description : Deletes user role
 *
 * Parameters passed to function deleteB2bAccountUserRole(deleteB2bAccountRole: deleteB2bAccountRole) => expects object of type 'deleteB2bAccountRole' containing accountId and input
 *
 * On success, calls refetchQueries on customerB2BUserKeys and fetches B2B users list.
 *
 * @returns 'response?.deleteB2bAccountRole' which is a boolean
 */

export const useDeleteB2bAccountRoleMutation = () => {
  const queryClient = useQueryClient()
  return {
    deleteB2bAccountUserRole: useMutation({
      mutationFn: deleteB2bAccountUserRole,
      onSuccess: () => queryClient.invalidateQueries(customerB2BUserKeys.all),
    }),
  }
}
