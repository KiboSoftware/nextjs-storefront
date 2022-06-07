import getConfig from 'next/config'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { CustomerUserAuthInfoInput } from '../../lib/gql/types'
import { loginKeys } from '../../lib/react-query/queryKeys'
import { makeGraphQLClient } from '@/lib/gql/client'
import { getCurrentUser } from '@/lib/gql/mutations/user/getUser'
import { loginMutation } from '@/lib/gql/mutations/user/login'
import { storeClientCookie } from '@/lib/helpers/cookieHelper'
import { useAuthContext } from '@/pages/contexts/AuthContext'

const client = makeGraphQLClient()
const { publicRuntimeConfig } = getConfig()
const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

const loadUser = async () => {
  const response = await client.request({
    document: getCurrentUser,
    variables: {},
  })

  return response
}

const loginUser = async (loginInput: CustomerUserAuthInfoInput) => {
  const response = await client.request({
    document: loginMutation,
    variables: { loginInput },
  })

  return response
}

export const useUser = () => {
  const queryClient = useQueryClient()
  const { toggleLoginDialog, setIsAuthenticated, setUser } = useAuthContext()
  const loginUserMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      if (data?.account?.userId) {
        const account = data?.account
        // set cookie
        const cookie = {
          accessToken: account?.accessToken,
          accessTokenExpiration: account?.accessTokenExpiration,
          refreshToken: account?.refreshToken,
          refreshTokenExpiration: account?.refreshTokenExpiration,
          userId: account?.userId,
        }
        storeClientCookie(authCookieName, cookie)
        setUser(account.customerAccount)
        setIsAuthenticated(true)
        toggleLoginDialog()
      }
      queryClient.removeQueries([loginKeys.all])
    },
  })

  const loginUserQuery = useQuery(['user'], () => loadUser())

  return {
    loginUserMutation,
    loginUserQuery,
  }
}
