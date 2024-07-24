/* eslint-disable @typescript-eslint/no-var-requires */
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { mock } from 'jest-mock-extended'
import mockRouter from 'next-router-mock'

import * as stories from './KiboHeader.stories' // import all stories from the stories file
import { AuthContext, AuthContextType } from '@/context'

const { Common } = composeStories(stories)

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(true),
}))

const SearchSuggestionsMock = () => <div data-testid="SearchSuggestions-component" />
jest.mock(
  '@/components/layout/SearchSuggestions/SearchSuggestions',
  () => () => SearchSuggestionsMock()
)
const setCookie = (name: any, value: any) => {
  document.cookie = `${name}=${value}; path=/`
}
const HamburgerMenuMock = () => <div data-testid="HamburgerMenu-component" />
jest.mock('@/components/layout/HamburgerMenu/HamburgerMenu', () => () => HamburgerMenuMock())

jest.mock('@/components/dialogs/b2b/AccountHierarchyFormDialog/AccountHierarchyFormDialog', () => ({
  __esModule: true,
  default: ({ onSave, onClose }: any) => (
    <div data-testid="accountHierarchyFormDialog-component">
      <button data-testid="onSave-button" onClick={onSave}>
        onSave
      </button>
      <button data-testid="onClose-button" onClick={onClose}>
        onClose
      </button>
    </div>
  ),
}))

const SwitchAccountMenuMock = () => <div data-testid="SwitchAccountMenu-component" />
jest.mock(
  '@/components/layout/AppHeader/Icons/SwitchAccountMenu/SwitchAccountMenu',
  () => () => SwitchAccountMenuMock()
)

describe('[component] KiboHeader component', () => {
  afterEach(() => {
    // Clean up cookies after each test
    document.cookie.split(';').forEach((cookie) => {
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    })
  })
  it('should render the component', async () => {
    render(<Common {...Common.args} />)

    await waitFor(() => {
      expect(screen.getByTestId(/header-container/)).toBeVisible()
    })

    expect(screen.getByTestId(/header-action-area/)).toBeVisible()
    expect(screen.getByTestId(/mega-menu-container/)).toBeVisible()
  })

  it('should render the navlinks', async () => {
    render(<Common {...Common.args} />)

    await waitFor(() => {
      Common?.args?.navLinks?.forEach((each) => {
        expect(screen.getAllByText(new RegExp(each.text))[0]).toBeVisible()
      })
    })
  })

  it('should render the logo', async () => {
    render(<Common {...Common.args} />)

    await waitFor(() => {
      expect(screen.getAllByAltText(/kibo-logo/i)[0]).toBeVisible()
    })
  })

  it('should render header actions', async () => {
    render(<Common {...Common.args} />)

    await waitFor(() => {
      expect(screen.getAllByTestId('FmdGoodIcon')[0]).toBeVisible()
    })

    expect(screen.getByTestId('ShoppingCartIcon')).toBeVisible()
    expect(screen.getByTestId(/PersonAddIcon/i)).toBeVisible()
  })

  it('should render the searchbox', async () => {
    render(<Common {...Common.args} />)

    await waitFor(() => {
      // expect(
      //   screen.getByRole('textbox', {
      //     name: /search-input/i,
      //   })
      // ).toBeVisible()
      expect(screen.getByTestId('SearchSuggestions-component')).toBeVisible()
    })
  })

  it('should render the megamenu section', async () => {
    render(<Common {...Common.args} />)

    await waitFor(() => {
      expect(screen.getByTestId('megamenu-container')).toBeVisible()
    })
  })

  it('should redirect to cart page when users clicks on cart icon', async () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)

    const cartIcon = screen.getByTestId('ShoppingCartIcon')
    await user.click(cartIcon)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/cart',
        pathname: '/cart',
        query: {},
      })
    })
  })

  it('should open b2b account request form dialog when user clicks on B2B Account Request link', async () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)

    const requestAccountLink = screen.getByTestId(/PersonAddIcon/i)
    await user.click(requestAccountLink)

    const accountHierarchyFormDialog = screen.getByTestId('accountHierarchyFormDialog-component')
    await waitFor(() => {
      expect(accountHierarchyFormDialog).toBeVisible()
    })

    const requestAccountButton = screen.getByRole('button', { name: /onSave/i })

    expect(requestAccountButton).toBeVisible()

    await user.click(requestAccountButton)

    await waitFor(() => {
      expect(accountHierarchyFormDialog).not.toBeInTheDocument()
    })
  })

  it('should open login dialog when user clicks on Account icon if guest user else redirect to my-account', async () => {
    const user = userEvent.setup()
    render(
      <AuthContext.Provider
        value={{
          isAuthenticated: true,
          user: {
            id: 1234,
            roleName: 'Admin',
          },
          login: jest.fn(),
          createAccount: jest.fn(),
          logout: jest.fn(),
        }}
      >
        <Common {...Common.args} />
      </AuthContext.Provider>
    )

    const myAccount = screen.getAllByTestId(/AccountCircleIcon/i)[0]
    await user.click(myAccount)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account',
        pathname: '/my-account',
        query: {},
      })
    })
  })
  it('should hide StoreFinderIcon when cookie isCSR has value true', async () => {
    setCookie('isCSR', 'true')
    render(<Common {...Common.args} />)
    await waitFor(() => {
      expect(screen.queryByTestId('Store-FinderIcon')).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByTestId('Account-Icon')).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByTestId('Account-Request-Icon')).not.toBeInTheDocument()
    })
  })

  it('should open switch account menu when user clicks on arrow down icon if user logged in with multiple accounts', async () => {
    const user = userEvent.setup()
    const mockValues = mock<AuthContextType>()
    mockValues.selectedAccountId = 1
    mockValues.accountsByUser = [1, 2]

    render(
      <AuthContext.Provider value={mockValues}>
        <Common {...Common.args} />
      </AuthContext.Provider>
    )

    const downArrow = screen.getAllByTestId(/KeyboardArrowDownOutlinedIcon/i)[0]
    await user.click(downArrow)

    await waitFor(() => {
      const menu = screen.getByTestId('SwitchAccountMenu-component')
      expect(menu).toBeInTheDocument()
    })
  })
})
