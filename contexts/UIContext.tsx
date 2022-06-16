import { ReactNode, createContext, useState, useContext } from 'react'

export interface UIContextType {
  isLoginDialogOpen: boolean
  toggleLoginDialog: () => void
}
interface UIContextProviderProps {
  children: ReactNode
}

export const UIStateContext = createContext({ isLoginDialogOpen: false } as UIContextType)

export const UIContextProvider = ({ children }: UIContextProviderProps) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false)

  const toggleLoginDialog = () => {
    setIsLoginDialogOpen((isLoginDialogOpen) => !isLoginDialogOpen)
  }

  const values = {
    isLoginDialogOpen,
    toggleLoginDialog,
  }

  return <UIStateContext.Provider value={values}>{children}</UIStateContext.Provider>
}

export const useUIContext = () => {
  const context = useContext(UIStateContext)
  if (context === undefined)
    throw new Error('useUIContext: useContext must be inside a Provider with a value')
  return context
}
