import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import * as stories from './WishlistTemplate.stories' // import all stories from the stories files/userMock'
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'

const { Common, Empty } = composeStories(stories)

const ProductCardMock = () => <div data-testid="product-card-mock" />
jest.mock('@/components/product/ProductCard/ProductCard', () => () => ProductCardMock())

let mockWishlist = wishlistMock?.items[0]

jest.mock('@/hooks', () => ({
  useWishlist: jest.fn(() => {
    return {
      addOrRemoveWishlistItem: jest.fn(() => true),
      wishlists: mockWishlist,
    }
  }),
  useProductCardActions: jest.fn(() => {
    return {
      handleAddToCart: jest.fn(() => null),
      openProductQuickViewModal: jest.fn(() => true),
    }
  }),
}))

const setup = () => {
  render(<Common {...Common?.args} />)
}

describe('[component] Wishlist Template component', () => {
  it('should render the wishlist component', () => {
    setup()

    const wishlistTemplate = screen.getByTestId('wishlist-template')
    const wishlistItemsQuantity = screen.getByText(/item-quantity/i)
    const productCardMock = screen.getAllByTestId('product-card-mock')

    expect(wishlistTemplate).toBeInTheDocument()
    expect(wishlistItemsQuantity).toBeVisible()
    expect(productCardMock.length).toBe(mockWishlist.items.length)
  })

  it('should render empty wishlist when no item present', async () => {
    mockWishlist = null
    const user = userEvent.setup()

    render(<Empty {...Empty?.args} />)

    const emptyWishlist = screen.getByText('empty-wishlist-message')
    const shopNowButton = screen.getByRole('button', { name: 'shop-now' })

    expect(emptyWishlist).toBeVisible()
    expect(shopNowButton).toBeVisible()

    user.click(shopNowButton)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
      })
    })
  })
})
