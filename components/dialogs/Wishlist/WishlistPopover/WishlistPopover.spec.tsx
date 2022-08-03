import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './WishlistPopover.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const setup = (args = Common.args) => {
  const user = userEvent.setup()
  render(<Common {...args} />)
  return {
    user,
  }
}

describe('[components] WishlistPopover', () => {
  it('should render component', () => {
    setup()

    const component = screen.getByTestId('wishlist-component')

    expect(component).toBeInTheDocument()
  })

  it('should display added message when wishlist item added', () => {
    setup()

    const addedWishlistMessage = screen.getByRole('heading', {
      name: /added!/i,
    })

    expect(addedWishlistMessage).toBeVisible()
  })

  it('should display remove message when wishlist item removed', () => {
    setup({
      isInWishlist: false,
    })

    const removeWishlistMessage = screen.getByRole('heading', {
      name: /removed!/i,
    })

    expect(removeWishlistMessage).toBeVisible()
  })

  it('should display view wishlist when wishlist item added/removed', async () => {
    setup()

    const viewWishlistButton = screen.getByRole('button', {
      name: /view-wishlist/i,
    })

    expect(viewWishlistButton).toBeVisible()
  })
})
