import { useMutation, useQueryClient } from 'react-query'

import { CustomerUserAuthInfoInput } from '../../../lib/gql/types'
import { loginKeys } from '../../../lib/react-query/queryKeys'
import { makeGraphQLClient } from '@/lib/gql/client'
import { loginMutation } from '@/lib/gql/mutations/user/login'

const client = makeGraphQLClient()
const loginUser = async (customerUserAuthInfoInput: CustomerUserAuthInfoInput) => {
  const response = await client.request({
    document: loginMutation,
    variables: { loginInput: customerUserAuthInfoInput },
  })
  return response?.account
}

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
