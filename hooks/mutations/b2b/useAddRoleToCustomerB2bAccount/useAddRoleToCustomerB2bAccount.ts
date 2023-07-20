/**
 * @module useAddRoleToCustomerB2bAccountMutation
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

import { addRoleToCustomerB2bAccountMutation } from '@/lib/gql/mutations'

const client = makeGraphQLClient()

const addRoleToCustomerB2bAccount = async (addRoleToCustomerB2bAccount: any) => {
  const response = await client.request({
    document: addRoleToCustomerB2bAccountMutation,
    variables: addRoleToCustomerB2bAccount,
  })
  return response?.addRoleToCustomerB2bAccount
}

/**
 * [Mutation hook] useAddRoleToCustomerB2bAccountMutation uses the graphQL mutation
 *
 * <b>addRoleToCustomerB2bAccount(accountId: Int!, addRoleToCustomerB2bAccount: addRoleToCustomerB2bAccount): B2BUser</b>
 *
 * Description : Adds role to newly created customer B2B user
 *
 * Parameters passed to function addRoleToCustomerB2bAccount(addRoleToCustomerB2bAccount: addRoleToCustomerB2bAccount) => expects object of type 'addRoleToCustomerB2bAccount' containing accountId and input
 *
 * On success, calls refetchQueries on customerB2BUserKeys and fetches B2B users list.
 *
 * @returns 'response?.addRoleToCustomerB2bAccount' which contains object of user added
 */

export const useAddRoleToCustomerB2bAccountMutation = () => {
  const queryClient = useQueryClient()
  return {
    addRoleToCustomerB2bAccount: useMutation({
      mutationFn: addRoleToCustomerB2bAccount,
      onSuccess: () => queryClient.invalidateQueries(customerB2BUserKeys.all),
    }),
  }
}
