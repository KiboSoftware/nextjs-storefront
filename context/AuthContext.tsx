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
  isAuthenticated: boolean
  user?: CustomerAccount
  login: (params: LoginData, toggleLoginDialog: () => void) => any
  setAuthError: Dispatch<SetStateAction<string>>
  authError: string
}
interface AuthContextProviderProps {
  children: ReactNode
}

const initialState = {
  isAuthenticated: false,
  authError: '',
  user: undefined,
  login: () => null,
  setAuthError: () => '',
}

export const UserContext = createContext(initialState as AuthContextType)
UserContext.displayName = 'AuthContext'

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<CustomerAccount>()
  const [authError, setAuthError] = useState<string>('')
  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()
  const { mutate } = useUserMutations()

  const login = (params: LoginData, onSuccessCallBack: () => void) => {
    setAuthError('')
    const userCredentials = {
      username: params?.formData?.email,
      password: params?.formData?.password,
    }
    mutate(userCredentials, {
      onError: (error: any) => {
        //@TO BE DONE GLOBALLY
        const errorMessage = error?.response?.errors
          ? error?.response?.errors[0]?.message
          : 'Something Wrong !'
        setAuthError(errorMessage)
      },
      onSuccess: (account: any) => {
        // set cookie
        const cookie = {
          accessToken: account?.accessToken,
          accessTokenExpiration: account?.accessTokenExpiration,
          refreshToken: account?.refreshToken,
          refreshTokenExpiration: account?.refreshTokenExpiration,
          userId: account?.userId,
        }
        storeClientCookie(authCookieName, cookie)
        setUser(account?.customerAccount)
        onSuccessCallBack()
      },
    })
  }

  const { data: customerAccount } = useUserQueries()

  const values = {
    isAuthenticated,
    user,
    authError,
    setAuthError,
    login,
  }

  useEffect(() => {
    if (customerAccount) {
      setUser(customerAccount)
    }
  }, [customerAccount])

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
