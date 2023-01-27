import React from 'react'

import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HeaderContextProvider, useHeaderContext } from './HeaderContext'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'

describe('[context] - HeaderContext', () => {
  const setup = (ui: any) => {
    const user = userEvent.setup()
    renderWithQueryClient(<HeaderContextProvider>{ui}</HeaderContextProvider>)
    return {
      user,
    }
  }
  const TestComponent = () => {
    const {
      headerState,
      toggleHamburgerMenu,
      toggleMobileSearchPortal,
      toggleSearchBar,
      toggleStoreLocator,
    } = useHeaderContext()

    return (
      <div>
        <div data-testid="isHamburgerMenuVisible">{String(headerState.isHamburgerMenuVisible)}</div>
        <button data-testid="toggleHamburgerMenu" onClick={toggleHamburgerMenu}>
          toggleHamburgerMenu
        </button>

        <div data-testid="isMobileSearchPortalVisible">
          {String(headerState.isMobileSearchPortalVisible)}
        </div>
        <button data-testid="toggleMobileSearchPortal" onClick={toggleMobileSearchPortal}>
          toggleMobileSearchPortal
        </button>

        <div data-testid="isSearchBarVisible">{String(headerState.isSearchBarVisible)}</div>
        <button data-testid="toggleSearchBar" onClick={() => toggleSearchBar(true)}>
          toggleSearchBar
        </button>

        <div data-testid="isStoreLocatorVisible">{String(headerState.isStoreLocatorVisible)}</div>
        <button data-testid="toggleStoreLocator" onClick={toggleStoreLocator}>
          toggleStoreLocator
        </button>
      </div>
    )
  }

  it('should render initial context values', () => {
    setup(<TestComponent />)
    expect(screen.getByTestId('isSearchBarVisible')).toHaveTextContent('false')
    expect(screen.getByTestId('isMobileSearchPortalVisible')).toHaveTextContent('false')
    expect(screen.getByTestId('isSearchBarVisible')).toHaveTextContent('false')
    expect(screen.getByTestId('isStoreLocatorVisible')).toHaveTextContent('false')
  })

  it('should handle toggleHamburgerMenu', async () => {
    const { user } = setup(<TestComponent />)

    expect(screen.getByTestId('isHamburgerMenuVisible')).toHaveTextContent('false')

    await user.click(screen.getByTestId('toggleHamburgerMenu'))

    expect(screen.getByTestId('isHamburgerMenuVisible')).toHaveTextContent('true')
  })

  it('should handle toggleMobileSearchPortal', async () => {
    const { user } = setup(<TestComponent />)

    expect(screen.getByTestId('isMobileSearchPortalVisible')).toHaveTextContent('false')

    await user.click(screen.getByTestId('toggleMobileSearchPortal'))

    expect(screen.getByTestId('isMobileSearchPortalVisible')).toHaveTextContent('true')
  })

  it('should handle toggleSearchBar', async () => {
    const { user } = setup(<TestComponent />)

    expect(screen.getByTestId('isSearchBarVisible')).toHaveTextContent('false')

    await user.click(screen.getByTestId('toggleSearchBar'))

    expect(screen.getByTestId('isSearchBarVisible')).toHaveTextContent('true')
  })

  it('should handle toggleStoreLocator', async () => {
    const { user } = setup(<TestComponent />)

    expect(screen.getByTestId('isStoreLocatorVisible')).toHaveTextContent('false')

    await user.click(screen.getByTestId('toggleStoreLocator'))

    expect(screen.getByTestId('isStoreLocatorVisible')).toHaveTextContent('true')
  })
})
