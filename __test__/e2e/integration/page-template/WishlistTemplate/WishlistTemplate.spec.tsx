import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/page-templates/WishlistTemplate/WishlistTemplate.stories' // import all stories from the stories file
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  render(
    <ModalContextProvider>
      <Common {...Common.args} />
    </ModalContextProvider>
  )

  return {
    user,
  }
}

describe('[component] - WishlistTemplate integration', () => {
  it('should remove wishlist item when clicks on wishlist icon ', async () => {
    const { user } = setup()
    await waitFor(async () => {
      const productCards = screen.getAllByTestId('product-card')
      const inWishlistIcon = within(productCards[0]).getByTestId('FavoriteRoundedIcon')
      await user.click(inWishlistIcon)
      await waitFor(() =>
        expect(
          screen.getByRole('heading', {
            name: /removed!/i,
          })
        ).toBeVisible()
      )
    })
  })
})
