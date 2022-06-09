import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCurrentUser } from '@/lib/gql/mutations/user/getUser'
import { loginKeys } from '@/lib/react-query/queryKeys'

const client = makeGraphQLClient()

const loadUser = async () => {
  const response = await client.request({
    document: getCurrentUser,
    variables: {},
  })

  return response
}

export const useUserQueries = (onSuccess: any, onError: any) => {
  const loginUserQuery = useQuery(loginKeys.user, loadUser, {
    onSuccess,
    onError,
  })

  return {
    loginUserQuery,
  }
}
