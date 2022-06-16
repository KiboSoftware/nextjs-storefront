import {
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from 'react'

import getConfig from 'next/config'

import { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import { useUserMutations, useUserQueries } from '@/hooks'
import { storeClientCookie } from '@/lib/helpers/cookieHelper'

import type { CustomerAccount } from '@/lib/gql/types'

interface AuthContextType {
  isAuthenticated?: boolean
  user?: CustomerAccount
  login: (params: LoginData, toggleLoginDialog: () => void) => string
  setAuthError: Dispatch<SetStateAction<string>>
  authError?: string
}
interface AuthContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as AuthContextType)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<CustomerAccount>()
  const [authError, setAuthError] = useState<string>('')
  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()
  const { mutate } = useUserMutations()

  const login = (params: LoginData, toggleLoginDialog: () => void) => {
    setAuthError('')
    try {
      const userCredentials = {
        username: params?.formData?.email,
        password: params?.formData?.password,
      }
      mutate(userCredentials, {
        onError: (error: any) => {
          //@TO BE DONE GLOBALLY
          const errorMessage = error?.response?.errors[0]?.message
            ? error?.response?.errors[0]?.message
            : 'Something Wrong !'
          setAuthError(errorMessage)
        },
        onSuccess: (data: any) => {
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
          toggleLoginDialog()
        },
      })
    } catch (err: any) {
      throw new Error(err)
    } finally {
      return authError
    }
  }

  const { data } = useUserQueries()

  const values = {
    isAuthenticated,
    user,
    authError,
    setAuthError,
    login,
  }

  useEffect(() => {
    if (data?.customerAccount) {
      setUser(data.customerAccount)
    }
  }, [data])

  useEffect(() => {
    setIsAuthenticated(user?.id ? true : false)
  }, [user])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) throw new Error('useContext must be inside a Provider with a value')
  return context
}
