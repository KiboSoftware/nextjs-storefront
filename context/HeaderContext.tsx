import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface HeaderState {
  isHamburgerMenuVisible?: boolean
  isSearchBarVisible?: boolean
  isStoreLocatorVisible?: boolean
  isMobileSearchPortalVisible?: boolean
}

interface HeaderContextType {
  headerState: HeaderState
  toggleSearchBar: () => void
  toggleHamburgerMenu: () => void
  toggleStoreLocator: () => void
  toggleMobileSearchPortal: () => void
}

interface HeaderContextProviderProps {
  children: ReactNode
}

const HeaderContext = createContext({
  headerState: {
    isSearchPortalVisible: false,
    isHamburgerMenuVisible: false,
    isStoreLocatorVisible: false,
  },
  toggleSearchBar: () => null,
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

  const toggleSearchBar = () =>
    setHeaderState({ ...headerState, isSearchBarVisible: !headerState.isSearchBarVisible })

  const toggleHamburgerMenu = () =>
    setHeaderState({ ...headerState, isHamburgerMenuVisible: !headerState.isHamburgerMenuVisible })

  const toggleStoreLocator = () =>
    setHeaderState({ ...headerState, isStoreLocatorVisible: !headerState.isStoreLocatorVisible })

  const toggleMobileSearchPortal = () =>
    setHeaderState({
      ...headerState,
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
