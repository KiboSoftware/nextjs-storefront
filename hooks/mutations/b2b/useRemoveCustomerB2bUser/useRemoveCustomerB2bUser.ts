/**
 * @module useRemoveCustomerB2bUserMutation
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { removeCustomerB2bUserMutation } from '@/lib/gql/mutations'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'
import { CustomerB2BUserParams } from '@/lib/types/CustomerB2BUser'

import { B2BUserInput } from '@/lib/gql/types'

const client = makeGraphQLClient()

const removeCustomerB2bUser = async (b2BUserInput: B2BUserInput) => {
  const response = await client.request({
    document: removeCustomerB2bUserMutation,
    variables: b2BUserInput,
  })
  return response?.removeCustomerB2bAccountUser
}

/**
 * [Mutation hook] useRemoveCustomerB2bUserMutation uses the graphQL mutation
 *
 * <b>removeCustomerB2bAccountUser(accountId: Int!, userId: String!): Boolean</b>
 *
 * Description : Removes customer B2B user from list
 *
 * Parameters passed to function removeCustomerB2bUser(b2BUserInput: B2BUserInput) => expects object of type 'B2BUserInput' containing accountId and userId
 *
 * On success, calls refetchQueries on customerB2BUserKeys and fetches B2B users list.
 *
 * @returns 'response?.removeCustomerB2bAccountUser' which is a boolean
 */

export const useRemoveCustomerB2bUserMutation = (param?: CustomerB2BUserParams) => {
  const queryClient = useQueryClient()
  return {
    removeCustomerB2bUser: useMutation({
      mutationFn: removeCustomerB2bUser,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: customerB2BUserKeys.all }),
    }),
  }
}
