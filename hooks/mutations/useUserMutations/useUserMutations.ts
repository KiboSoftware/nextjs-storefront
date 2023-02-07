/**
 * @module useUserMutations
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { loginMutation } from '@/lib/gql/mutations/user/login'
import { loginKeys } from '@/lib/react-query/queryKeys'

import type { CustomerUserAuthInfoInput } from '@/lib/gql/types'

const client = makeGraphQLClient()
const loginUser = async (customerUserAuthInfoInput: CustomerUserAuthInfoInput) => {
  const response = await client.request({
    document: loginMutation,
    variables: { loginInput: customerUserAuthInfoInput },
  })
  return response?.account
}

/**
 * [Mutation hook] useUserMutations uses the graphQL mutation
 *
 * <b>createCustomerAuthTicket(customerUserAuthInfoInput: CustomerUserAuthInfoInput): CustomerAuthTicket</b>
 *
 * Description : Logs user in account by creating auth ticket
 *
 * Parameters passed to function loginUser(customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput) => expects object of type ' CustomerAccountAndAuthInfoInput' containing password and username
 *
 * On success, calls invalidateQueries on loginKeys and fetches the updated result.
 *
 * @returns 'response?.account', which contains information related to logged in user account
 */

export const useUserMutations = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    mutateAsync,
    data = {},
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(loginUser, {
    onMutate: () => {
      queryClient.cancelQueries(loginKeys.user)
    },
    retry: 0,
  })

  return {
    mutate,
    mutateAsync,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
