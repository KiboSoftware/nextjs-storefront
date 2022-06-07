import React, { ReactNode } from 'react'

import LoginDialog from '@/components/layout/Login'

import { CustomerAccount } from '@/lib/gql/types'

interface AuthContextType {
  isOpenLoginDialog?: boolean
  toggleLoginDialog: () => void
  isAuthenticated?: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  user?: CustomerAccount
  setUser: React.Dispatch<React.SetStateAction<CustomerAccount | undefined>>
}
interface AuthContextProviderProps {
  children: ReactNode
}

export const UserContext = React.createContext({} as AuthContextType)

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isOpenLoginDialog, setIsOpenLoginDialog] = React.useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<CustomerAccount>()

  const toggleLoginDialog = () => {
    setIsOpenLoginDialog((isOpenLoginDialog) => !isOpenLoginDialog)
  }

  const values = {
    isOpenLoginDialog,
    toggleLoginDialog,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  }

  return (
    <UserContext.Provider value={values}>
      <LoginDialog
        isOpen={isOpenLoginDialog}
        onForgotPassword={() => ''}
        onRegisterNow={() => ''}
        onClose={toggleLoginDialog}
      />
      {children}
    </UserContext.Provider>
  )
}

export default AuthContextProvider

export const useAuthContext = () => {
  const ctx = React.useContext(UserContext)
  if (ctx === undefined) throw new Error('useCtx must be inside a Provider with a value')
  return ctx
}
