import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
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
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should display login when add to wishlist button clicks ', async () => {
    mockIsAuthenticated = false
    const { user } = setup()

    const inWishlistIcon = screen.getAllByTestId('FavoriteBorderRoundedIcon')
    expect(inWishlistIcon[0]).toBeVisible()
    await user.click(inWishlistIcon[0])
    const title = screen.getByText('common:log-in')

    expect(title).toBeVisible()
  })

  it('should open wishlist added popover when logged in user clicks on wishlist icon', async () => {
    mockIsAuthenticated = true
    const { user } = setup()

    const inWishlistIcon = screen.getAllByTestId('FavoriteBorderRoundedIcon')
    await user.click(inWishlistIcon[0])
    const popover = await screen.findByTestId('wishlist-component')

    await waitFor(() => expect(popover).toBeInTheDocument())
  })
})
