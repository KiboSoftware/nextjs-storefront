/* eslint-disable @typescript-eslint/no-var-requires */
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock'

import * as stories from './KiboHeader.stories' // import all stories from the stories file
import { AuthContext } from '@/context'

const { Common } = composeStories(stories)

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(true),
}))

describe('[component] KiboHeader component', () => {
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
      expect(screen.getByTestId('FmdGoodIcon')).toBeVisible()
    })

    expect(screen.getByTestId('ShoppingCartIcon')).toBeVisible()
    expect(screen.getByTestId(/PersonAddIcon/i)).toBeVisible()
  })

  it('should render the searchbox', async () => {
    render(<Common {...Common.args} />)

    await waitFor(() => {
      expect(
        screen.getByRole('textbox', {
          name: /search-input/i,
        })
      ).toBeVisible()
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

    await waitFor(() => {
      const accountHierarcyFormDialog = screen.getByRole('dialog')
      expect(accountHierarcyFormDialog).toBeVisible()
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
})
