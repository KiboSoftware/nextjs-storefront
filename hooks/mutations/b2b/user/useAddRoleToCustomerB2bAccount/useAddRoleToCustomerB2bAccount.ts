/**
 * @module useAddRoleToCustomerB2bAccountMutation
 */
import { useMutation } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import { addRoleToCustomerB2bAccountMutation } from '@/lib/gql/mutations'

const client = makeGraphQLClientWithoutUserClaims()

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
  return {
    addRoleToCustomerB2bAccount: useMutation({
      mutationFn: addRoleToCustomerB2bAccount
    }),
  }
}
