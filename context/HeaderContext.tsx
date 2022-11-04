import { createContext, ReactNode, useContext, useState } from 'react'

interface HeaderState {
  isHamburgerMenuVisible?: boolean
  isSearchBarVisible?: boolean
  isStoreLocatorVisible?: boolean
  isMobileSearchPortalVisible?: boolean
}

export interface HeaderContextType {
  headerState: HeaderState
  toggleSearchBar: (value: boolean) => void
  toggleHamburgerMenu: () => void
  toggleStoreLocator: () => void
  toggleMobileSearchPortal: () => void
}

interface HeaderContextProviderProps {
  children: ReactNode
}

export const HeaderContext = createContext({
  headerState: {
    isSearchBarVisible: false,
    isHamburgerMenuVisible: false,
    isStoreLocatorVisible: false,
    isMobileSearchPortalVisible: false,
  },
  toggleSearchBar: (value: boolean) => null,
  toggleHamburgerMenu: () => null,
  toggleStoreLocator: () => null,
  toggleMobileSearchPortal: () => null,
} as HeaderContextType)

export const HeaderContextProvider = ({ children }: HeaderContextProviderProps) => {
  const [headerState, setHeaderState] = useState<HeaderState>({
    isSearchBarVisible: false,
    isHamburgerMenuVisible: false,
    isStoreLocatorVisible: false,
    isMobileSearchPortalVisible: false,
  })

  const toggleSearchBar = (value: boolean) =>
    setHeaderState({ ...headerState, isSearchBarVisible: value })

  const toggleHamburgerMenu = () => {
    console.log('toggle', headerState.isHamburgerMenuVisible)
    setHeaderState({
      ...headerState,
      isMobileSearchPortalVisible: false,
      isHamburgerMenuVisible: !headerState.isHamburgerMenuVisible,
    })
  }

  const toggleStoreLocator = () =>
    setHeaderState({
      ...headerState,
      isMobileSearchPortalVisible: false,
      isStoreLocatorVisible: !headerState.isStoreLocatorVisible,
    })

  const toggleMobileSearchPortal = () =>
    setHeaderState({
      ...headerState,
      isHamburgerMenuVisible: false,
      isMobileSearchPortalVisible: !headerState.isMobileSearchPortalVisible,
    })

  const values = {
    headerState,
    toggleSearchBar,
    toggleHamburgerMenu,
    toggleStoreLocator,
    toggleMobileSearchPortal,
  }
  return <HeaderContext.Provider value={values}>{children}</HeaderContext.Provider>
}

export const useHeaderContext = () => {
  const context = useContext(HeaderContext)
  if (context === undefined) throw new Error('useContext must be inside a Provider with a value')
  return context
}
