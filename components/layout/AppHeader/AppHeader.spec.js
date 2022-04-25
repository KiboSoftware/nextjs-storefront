import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom'

import * as stories from './AppHeader.stories' // import all stories from the stories file

const { Common, Mobile } = composeStories(stories)

describe('[component] AppHeader component', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId(/kibo header/i)).toBeVisible()
  })

  it('should render the navlinks', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByText(/order status/i)).toBeVisible()
    expect(screen.getByText(/wishlist/i)).toBeVisible()
    expect(screen.getByText(/nav link 2/i)).toBeVisible()
    expect(screen.getByText(/nav link 3/i)).toBeVisible()
  })

  it('should render the logo', () => {
    render(<Common {...Common.args} />)

    expect(screen.getAllByAltText(/kibo-logo/i)[0]).toBeVisible()
  })

  it('should render header actions', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('FmdGoodIcon')).toBeVisible()
    expect(screen.getByText(/find a store/i)).toBeVisible()

    expect(screen.getByTestId('AccountCircleIcon')).toBeVisible()
    expect(screen.getByText(/my account/i)).toBeVisible()

    expect(screen.getByTestId('ShoppingCartIcon')).toBeVisible()
    expect(screen.getByText(/cart/i)).toBeVisible()
  })

  it('should render the searchbox', () => {
    render(<Common {...Common.args} />)

    expect(
      screen.getByRole('textbox', {
        name: /search-input/i,
      })
    ).toBeVisible()
  })

  it('should render the megamenu section', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('megamenu-container')).toBeVisible()
  })

  it('should render the hamburger icon in mobile viewport', () => {
    render(<Mobile {...Common.args} />)

    expect(screen.getByTestId('MenuIcon')).toBeVisible()
  })

  it('should render the searchbox after clicking search icon in mobile viewport', () => {
    render(<Mobile {...Common.args} />)
    const searchIcon = screen.getByTestId('mobile-searchIcon-container')
    expect(searchIcon).toBeVisible()

    userEvent.click(searchIcon)
    const searchbarContainer = screen.getByTestId('searchbar-container')
    expect(
      within(searchbarContainer).getByRole('textbox', {
        name: /search-input/i,
      })
    ).toBeVisible()
  })
})
