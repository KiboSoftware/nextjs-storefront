import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.stories' // import all stories from the stories file
import { DialogRoot, ModalContextProvider } from '@/context'

const { Category } = composeStories(stories)
const setup = () => {
  const user = userEvent.setup()
  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <Category {...Category.args} />
    </ModalContextProvider>
  )

  return {
    user,
  }
}

let mockIsAuthenticated = true
jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ isAuthenticated: mockIsAuthenticated }),
}))

describe('[component] - ProductListingTemplate integration', () => {
  it('should display login when add to wishlist button clicks ', async () => {
    mockIsAuthenticated = false
    const { user } = setup()

    const inWishlistIcon = screen.getAllByTestId('FavoriteBorderRoundedIcon')
    expect(inWishlistIcon[0]).toBeVisible()
    await user.click(inWishlistIcon[0])
    const title = screen.getAllByText('log-in')[0]

    expect(title).toBeVisible()
  })

  it('should display productquickviewDialog when quick-view button is clicked', async () => {
    mockIsAuthenticated = false
    const { user } = setup()

    const productCards = screen.getAllByTestId('product-card')
    const quickViewButton = within(productCards[0]).getByRole('button', { name: /quick-view/i })
    await user.click(quickViewButton)
    expect(screen.getByRole('button', { name: 'close' })).toBeVisible()
  })
})
