import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createAccountAndLoginMutation } from '@/lib/gql/mutations/user/createAccount'
import { loginKeys } from '@/lib/react-query/queryKeys'

import { CustomerAccountAndAuthInfoInput } from '@/lib/gql/types'

const client = makeGraphQLClient()
const registerUser = async (customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput) => {
  const response = await client.request({
    document: createAccountAndLoginMutation,
    variables: { customerAccountAndAuthInfoInput },
  })
  return response?.account
}

export const useUserAccountRegistrationMutations = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    mutateAsync,
    data = {},
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(registerUser, {
    onMutate: () => {
      queryClient.invalidateQueries(loginKeys.user)
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
