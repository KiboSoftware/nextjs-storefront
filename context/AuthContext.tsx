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
import { useQueryClient } from 'react-query'

import { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import type { RegisterAccountInputData } from '@/components/layout/RegisterAccount/Content/Content'
import { useSnackbarContext } from '@/context'
import {
  useRegister,
  useLogin,
  useGetCurrentCustomer,
  useUserAccountRegistrationMutations,
  useUserMutations,
  useUserQueries,
} from '@/hooks'
import { removeClientCookie } from '@/lib/helpers'
import { cartKeys, loginKeys, wishlistKeys } from '@/lib/react-query/queryKeys'

import type { CustomerAccount } from '@/lib/gql/types'

export interface AuthContextType {
  isAuthenticated: boolean
  user?: CustomerAccount
  login: (params: LoginData, onSuccessCallBack: () => void) => any
  createAccount: (params: RegisterAccountInputData, onSuccessCallBack?: () => void) => any
  logout: () => void
}
interface AuthContextProviderProps {
  children: ReactNode
}

const initialState = {
  isAuthenticated: false,
  user: undefined,
  login: () => null,
  createAccount: () => null,
  logout: () => '',
}

export const AuthContext = createContext(initialState as AuthContextType)
AuthContext.displayName = 'AuthContext'

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<CustomerAccount | undefined>(undefined)
  const { publicRuntimeConfig } = getConfig()
  const authCookieName = publicRuntimeConfig.userCookieKey.toLowerCase()
  const { showSnackbar } = useSnackbarContext()

  const router = useRouter()
  const { mutate } = useLogin()
  const { mutate: registerUserAccount } = useRegister()

  const queryClient = useQueryClient()

  const handleOnSuccess = (account: any, onSuccessCallBack?: () => void) => {
    setUser(account?.customerAccount)

    queryClient.invalidateQueries(cartKeys.all)
    onSuccessCallBack && onSuccessCallBack()
    queryClient.removeQueries(wishlistKeys.all)
  }
  // register user
  const createAccount = (params: RegisterAccountInputData, onSuccessCallBack?: () => void) => {
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
        onSuccess: (account: any) => {
          handleOnSuccess(account, onSuccessCallBack)
        },
      })
    } catch (err: any) {
      throw new Error(err)
    }
  }

  // login user
  const login = (params: LoginData, onSuccessCallBack: () => void) => {
    const userCredentials = {
      username: params?.formData?.email,
      password: params?.formData?.password,
    }
    mutate(userCredentials, {
      onSuccess: (account: any) => {
        handleOnSuccess(account, onSuccessCallBack)
      },
    })
  }

  // Logout user
  const logout = async (): Promise<void> => {
    try {
      removeClientCookie(authCookieName)
      router.push('/')
      queryClient.removeQueries(cartKeys.all)
      queryClient.removeQueries(loginKeys.user)
    } catch (err) {
      showSnackbar('Logout Failed', 'error')
    }
  }

  const { data: customerAccount } = useUserQueries()

  const values = {
    isAuthenticated,
    user,
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

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context === undefined) throw new Error('useContext must be inside a Provider with a value')
  return context
}
