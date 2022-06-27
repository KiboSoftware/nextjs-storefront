import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCurrentUser } from '@/lib/gql/mutations/user/getUser'
import { loginKeys } from '@/lib/react-query/queryKeys'

import type { CustomerAccount } from '@/lib/gql/types'
export interface UserResultType {
  data?: CustomerAccount
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: any
}
const client = makeGraphQLClient()

const loadUser = async () => {
  const response = await client.request({
    document: getCurrentUser,
    variables: {},
  })

  return response?.customerAccount
}

export const useUserQueries = (): UserResultType => {
  const { data, isLoading, isSuccess, isError, error } = useQuery(loginKeys.user, loadUser)
  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
  }
}
