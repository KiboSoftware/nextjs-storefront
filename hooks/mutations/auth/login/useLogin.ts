/**
 * @module useLogin
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient, LOGIN_ENDPOINT } from '@/lib/gql/client'
import { loginMutation } from '@/lib/gql/mutations/user/login'
import { loginKeys } from '@/lib/react-query/queryKeys'

import type { CustomerUserAuthInfoInput } from '@/lib/gql/types'

const client = makeGraphQLClient(LOGIN_ENDPOINT)
const loginUser = async (customerUserAuthInfoInput: CustomerUserAuthInfoInput) => {
  const response = await client.request({
    document: loginMutation,
    variables: { loginInput: customerUserAuthInfoInput },
  })
  return response?.account
}

/**
 * [Mutation hook] useLogin uses the graphQL mutation
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

export const useLogin = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    mutateAsync,
    data = {},
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      queryClient.invalidateQueries({ queryKey: loginKeys.user })
    },
    retry: 0,
  })

  return {
    mutate,
    mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
