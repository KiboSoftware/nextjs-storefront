import { ReactNode, createContext, useState, useContext, useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'

import { useSnackbarContext } from './RQNotificationContext/RQNotificationContext'
import { LoginData } from '@/components/layout/Login/LoginContent/LoginContent'
import type { RegisterAccountInputData } from '@/components/layout/RegisterAccount/Content/Content'
import {
  useRegister,
  useLogin,
  useLogout,
  useGetCurrentCustomer,
  useGetB2BUserQueries,
} from '@/hooks'
import { AccountType } from '@/lib/constants'
import { cartKeys, loginKeys, wishlistKeys } from '@/lib/react-query/queryKeys'

import type { CustomerAccount } from '@/lib/gql/types'

type CustomerAccountWithRole = CustomerAccount & {
  roleId?: number
  roleName?: string
}
export interface AuthContextType {
  isAuthenticated: boolean
  user?: CustomerAccountWithRole
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
  const [user, setUser] = useState<CustomerAccountWithRole | undefined>(undefined)
  const { showSnackbar } = useSnackbarContext()

  const router = useRouter()

  const { mutate } = useLogin()
  const { mutate: logOutUser } = useLogout(() => {
    setUser(undefined)
    deleteCookie('behaviors', {
      path: '/',
    })
    router.push('/')
    queryClient.removeQueries({ queryKey: cartKeys.all })
    queryClient.removeQueries({ queryKey: loginKeys.user })
  })
  const { registerUserAccount } = useRegister()

  const queryClient = useQueryClient()

  const isB2BUser = user?.accountType?.toLowerCase() === AccountType.B2B.toLowerCase()

  const { data: userAccount } = useGetB2BUserQueries({
    accountId: user?.id as number,
    filter: `userId eq ${user?.userId}`,
    isB2BUser: isB2BUser,
  })

  useEffect(() => {
    const roles =
      userAccount &&
      userAccount?.items &&
      userAccount?.items[0] &&
      userAccount?.items[0]?.roles &&
      userAccount?.items[0]?.roles[0]

    if (!roles) return

    const { roleId, roleName } = roles
    const userWithRole = { ...user, roleId, roleName } as CustomerAccountWithRole
    setUser(userWithRole)
  }, [userAccount])

  const handleOnSuccess = (account: any, onSuccessCallBack?: () => void) => {
    if (account?.customerAccount) {
      document.cookie = `behaviors=${account?.behaviors}; path=/`
      setUser(account?.customerAccount)
    }

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
      registerUserAccount.mutate(createAccountAndLoginMutationVars, {
        onSuccess: (account: any) => {
          handleOnSuccess(account, onSuccessCallBack)
        },
      })
    } catch (err: any) {
      showSnackbar('Registration Failed', 'error')
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
      showSnackbar('Logout Failed', 'error')
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
