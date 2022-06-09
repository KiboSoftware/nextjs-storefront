import {
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from 'react'

import { CustomerAccount } from '@/lib/gql/types'

interface AuthContextType {
  isLoginDialogOpen?: boolean
  toggleLoginDialog: () => void
  isAuthenticated?: boolean
  user?: CustomerAccount
  setUser: Dispatch<SetStateAction<CustomerAccount | undefined>>
  authError?: string
  setAuthError: Dispatch<SetStateAction<string>>
}
interface AuthContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as AuthContextType)

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoginDialogOpen, setisLoginDialogOpen] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<CustomerAccount>()
  const [authError, setAuthError] = useState<string>('')

  const toggleLoginDialog = () => {
    setisLoginDialogOpen((isLoginDialogOpen) => !isLoginDialogOpen)
  }

  const values = {
    isLoginDialogOpen,
    toggleLoginDialog,
    isAuthenticated,
    user,
    setUser,
    authError,
    setAuthError,
  }

  useEffect(() => {
    setIsAuthenticated(user?.id ? true : false)
  }, [user])

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export default AuthContextProvider

export const useAuthContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) throw new Error('useContext must be inside a Provider with a value')
  return context
}
