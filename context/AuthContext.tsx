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
import { useRouter } from 'next/router'

import { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import type { RegisterAccountInputData } from '@/components/layout/RegisterAccount/Content/Content'
import { useUserAccountRegistrationMutations, useUserMutations, useUserQueries } from '@/hooks'
import { removeClientCookie, storeClientCookie } from '@/lib/helpers/cookieHelper'

import type { CustomerAccount } from '@/lib/gql/types'

interface AuthContextType {
  isAuthenticated: boolean
  user?: CustomerAccount
  login: (params: LoginData, onSuccessCallBack: () => void) => any
  createAccount: (params: RegisterAccountInputData, onSuccessCallBack: () => void) => any
  setAuthError: Dispatch<SetStateAction<string>>
  authError: string
  logout: () => void
}
interface AuthContextProviderProps {
  children: ReactNode
}

const initialState = {
  isAuthenticated: false,
  user: undefined,
  authError: '',
  login: () => null,
  createAccount: () => null,
  setAuthError: () => '',
  logout: () => '',
}

export const UserContext = createContext(initialState as AuthContextType)
UserContext.displayName = 'AuthContext'

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<CustomerAccount>()
  const [authError, setAuthError] = useState<string>('')
  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()

  const router = useRouter()
  const { mutate } = useUserMutations()
  const { mutate: registerUserAccount } = useUserAccountRegistrationMutations()

  // register user
  const createAccount = (params: RegisterAccountInputData, onSuccessCallBack: () => void) => {
    try {
      const createAccountAndLoginMutationVars = {
        account: {
          id: 0,
          userName: params?.email,
          emailAddress: params?.email,
          firstName: params?.firstName,
          lastName: params?.lastNameOrSurname,
        },
        password: params?.password,
      }
      registerUserAccount(createAccountAndLoginMutationVars, {
        onError: (error: any) => {
          //@TO BE DONE GLOBALLY
          const errorMessage = error?.response?.errors
            ? error?.response?.errors[0]?.message
            : 'Something Wrong !'
          setAuthError(errorMessage)
        },
        onSuccess: (account: any) => {
          // set cookie
          setCookieAndUser(account)
          onSuccessCallBack()
        },
      })
    } catch (err: any) {
      throw new Error(err)
    }
  }

  // login user
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
        setCookieAndUser(account)
        onSuccessCallBack()
      },
    })
  }

  // Logout user
  const logout = async (): Promise<void> => {
    try {
      removeClientCookie(authCookieName)
      router.push('/')
    } catch (err) {
      setAuthError('Logout Failed')
    }
  }

  const setCookieAndUser = (account: any) => {
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
  }

  const { data: customerAccount } = useUserQueries()

  const values = {
    isAuthenticated,
    user,
    authError,
    setAuthError,
    login,
    createAccount,
    setUser,
    logout,
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
