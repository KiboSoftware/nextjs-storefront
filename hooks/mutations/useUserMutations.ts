import { useMutation, useQueryClient } from 'react-query'

import { CustomerUserAuthInfoInput } from '../../lib/gql/types'
import { loginKeys } from '../../lib/react-query/queryKeys'
import { makeGraphQLClient } from '@/lib/gql/client'
import { loginMutation } from '@/lib/gql/mutations/user/login'

const client = makeGraphQLClient()

const loginUser = async (customerUserAuthInfoInput: CustomerUserAuthInfoInput) => {
  const response = await client.request({
    document: loginMutation,
    variables: { loginInput: customerUserAuthInfoInput },
  })

  return response
}

export const useUserMutations = () => {
  const queryClient = useQueryClient()

  const loginUserMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      queryClient.removeQueries(loginKeys.user)
      return data
    },
  })

  return {
    loginUserMutation,
  }
}
