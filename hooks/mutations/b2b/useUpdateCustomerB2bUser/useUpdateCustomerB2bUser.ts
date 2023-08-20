/**
 * @module useUpdateCustomerB2bUserMutation
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerB2bUserMutation } from '@/lib/gql/mutations'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

import { MutationUpdateCustomerB2bAccountUserArgs } from '@/lib/gql/types'

const client = makeGraphQLClient()

const updateCustomerB2bUser = async (b2BUserInput: MutationUpdateCustomerB2bAccountUserArgs) => {
  const response = await client.request({
    document: updateCustomerB2bUserMutation,
    variables: b2BUserInput,
  })
  return response?.updateCustomerB2bAccountUser
}

/**
 * [Mutation hook] useUpdateCustomerB2bUserMutation uses the graphQL mutation
 *
 * <b>updateCustomerB2bAccountUser(accountId: Int!, userId: Int!, b2BUserInput: b2BUserInput): B2BUser</b>
 *
 * Description : Updates customer B2B user
 *
 * Parameters passed to function updateCustomerB2bUser(b2BUserInput: B2BUserInput) => expects object of type 'B2BUserInput' containing accountId, userId and b2bUserInput
 *
 * On success, calls refetchQueries on customerB2BUserKeys and fetches B2B users list.
 *
 * @returns 'response?.account' which contains object of user updated
 */

export const useUpdateCustomerB2bUserMutation = () => {
  const queryClient = useQueryClient()
  return {
    updateCustomerB2bUser: useMutation({
      mutationFn: updateCustomerB2bUser,
      onSuccess: () => queryClient.invalidateQueries(customerB2BUserKeys.all),
    }),
  }
}
