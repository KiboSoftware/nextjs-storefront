/**
 * @module useCreateCustomerB2bAccountMutation
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCustomerB2bAccountMutation } from '@/lib/gql/mutations'
import { accountHierarchyKeys } from '@/lib/react-query/queryKeys'

import { B2BAccount, MutationCreateCustomerB2bAccountArgs } from '@/lib/gql/types'

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
 * <b>createCustomerB2bAccountUser(b2BAccountInput: b2BAccountInput): B2BAccount</b>
 *
 * Description : Adds account in hierarchy
 *
 * Parameters passed to function createCustomerB2bAccount(b2BAccountInput: B2BAccountInput) => expects object of type 'B2BAccountInput' containing accountId and input
 *
 * On success, calls invalidateQueries on accountHierarchyKeys and fetches account hierarchy.
 *
 * @returns 'response?.createCustomerB2bAccount' which contains object of account added
 */

export const useCreateCustomerB2bAccountMutation = () => {
  const queryClient = useQueryClient()
  return {
    createCustomerB2bAccount: useMutation({
      mutationFn: createCustomerB2bAccount,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: accountHierarchyKeys.all }),
    }),
  }
}
