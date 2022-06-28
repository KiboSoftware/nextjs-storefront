import { ReactNode, createContext, useState, useContext } from 'react'

export interface UIContextType {
  isLoginDialogOpen: boolean
  toggleLoginDialog: () => void
  isRegisterDialogOpen: boolean
  toggleRegisterDialog: () => void
}
interface UIContextProviderProps {
  children: ReactNode
}

export const UIStateContext = createContext({
  isLoginDialogOpen: false,
  isRegisterDialogOpen: false,
} as UIContextType)

export const UIContextProvider = ({ children }: UIContextProviderProps) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false)
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState<boolean>(false)

  const toggleLoginDialog = () => {
    setIsLoginDialogOpen((isOpen) => !isOpen)
  }
  const toggleRegisterDialog = () => {
    setIsRegisterDialogOpen((isOpen) => !isOpen)
  }

  const values = {
    isLoginDialogOpen,
    toggleLoginDialog,
    isRegisterDialogOpen,
    toggleRegisterDialog,
  }

  return <UIStateContext.Provider value={values}>{children}</UIStateContext.Provider>
}

export const useUIContext = () => {
  const context = useContext(UIStateContext)
  if (context === undefined)
    throw new Error('useUIContext: useContext must be inside a Provider with a value')
  return context
}
