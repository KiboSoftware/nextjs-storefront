/**
 * @module useCreateCustomerB2bAccountMutation
 */
import { useMutation } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'

import { B2BAccount, MutationCreateCustomerB2bAccountArgs } from '@/lib/gql/types'
import { createCustomerB2bAccountMutation } from '@/lib/gql/mutations'

const client = makeGraphQLClient()

const createCustomerB2bAccount = async (
  b2BAccountInput: MutationCreateCustomerB2bAccountArgs
): Promise<B2BAccount> => {
  const response = await client.request({
    document: createCustomerB2bAccountMutation,
    variables: b2BAccountInput,
  })
  return response?.createCustomerB2bAccount
}

/**
 * [Mutation hook] useCreateCustomerB2bAccountMutation uses the graphQL mutation
 *
 * <b>createCustomerB2bAccountUser(b2BAccountInput: b2BAccountInput): B2BUser</b>
 *
 * Description : Adds account in hierarchy
 *
 * Parameters passed to function createCustomerB2bAccount(b2BAccountInput: B2BAccountInput) => expects object of type 'B2BAccountInput' containing accountId and input
 *
 * On success, calls refetchQueries on customerB2BUserKeys and fetches account hierarchy.
 *
 * @returns 'response?.data?.createCustomerB2bAccount' which contains object of account added
 */

export const useCreateCustomerB2bAccountMutation = () => {
  return {
    createCustomerB2bAccount: useMutation({
      mutationFn: createCustomerB2bAccount,
    }),
  }
}
