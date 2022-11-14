/* eslint-disable @typescript-eslint/no-var-requires */
import { composeStories } from '@storybook/testing-react'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import * as stories from './KiboHeader.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementation(() => ({
  push,
  pathname: '/',
}))

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(true),
}))

afterEach(() => {
  cleanup()
})

describe('[component] KiboHeader component', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId(/top-bar/)).toBeVisible()
    expect(screen.getByTestId(/header-action-area/)).toBeVisible()
    expect(screen.getByTestId(/mega-menu-container/)).toBeVisible()
  })

  it('should render the navlinks', () => {
    render(<Common {...Common.args} />)

    Common?.args?.navLinks?.forEach((each) => {
      expect(screen.getAllByText(new RegExp(each.text))[0]).toBeVisible()
    })
  })

  it('should render the logo', () => {
    render(<Common {...Common.args} />)

    expect(screen.getAllByAltText(/kibo-logo/i)[0]).toBeVisible()
  })

  it('should render header actions', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('FmdGoodIcon')).toBeVisible()
    expect(screen.getByText(/find-a-store/i)).toBeVisible()
    expect(screen.getAllByTestId('AccountCircleIcon')[0]).toBeVisible()
    expect(screen.getAllByText(/my-account/i)[0]).toBeVisible()

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

  it('should redirect to cart page when users clicks on cart icon', async () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)

    const cartIcon = screen.getByTestId('ShoppingCartIcon')
    await user.click(cartIcon)

    expect(push).toHaveBeenCalledWith('/cart')
  })
})
