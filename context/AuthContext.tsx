import { ReactNode, createContext, useState, useContext, useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import type { RegisterAccountInputData } from '@/components/layout/RegisterAccount/Content/Content'
import { useRegister, useLogin, useLogout, useGetCurrentCustomer } from '@/hooks'
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

  const router = useRouter()

  const { mutate } = useLogin()
  const { mutate: logOutUser } = useLogout(() => {
    setUser(undefined)
    router.push('/')
    queryClient.removeQueries({ queryKey: cartKeys.all })
    queryClient.removeQueries({ queryKey: loginKeys.user })
  })
  const { registerUserAccount } = useRegister()

  const queryClient = useQueryClient()

  const handleOnSuccess = (account: any, onSuccessCallBack?: () => void) => {
    if (account?.customerAccount) setUser(account?.customerAccount)

    queryClient.invalidateQueries({ queryKey: cartKeys.all })
    onSuccessCallBack && onSuccessCallBack()
    queryClient.removeQueries({ queryKey: wishlistKeys.all })
  }
  // register user
  const createAccount = async (
    params: RegisterAccountInputData,
    onSuccessCallBack?: () => void
  ) => {
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
      const account = await registerUserAccount.mutateAsync(createAccountAndLoginMutationVars)
      if (account.userId) {
        handleOnSuccess(account, onSuccessCallBack)
        return account
      }
      return null
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
      logOutUser()
    } catch (err: any) {
      throw new Error(err)
    }
  }

  const { data: customerAccount } = useGetCurrentCustomer()

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
