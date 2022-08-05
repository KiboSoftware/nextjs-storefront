import { composeStories } from '@storybook/testing-react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from './WishlistTemplate.stories' // import all stories from the stories file
import { wishlistMock } from '@/__mocks__/stories/wishlistMock'

const { Common } = composeStories(stories)

afterEach(cleanup)

const ProductCardMock = () => <div data-testid="product-card-mock" />
jest.mock('@/components/product/ProductCard/ProductCard', () => ProductCardMock)

const mockWishlist = wishlistMock?.items[0]

jest.mock('@/hooks', () => ({
  useWishlist: jest.fn(() => {
    return {
      addOrRemoveWishlistItem: jest.fn(() => true),
      checkProductInWishlist: jest.fn(() => true),
    }
  }),
  useWishlistQueries: jest.fn(() => mockWishlist),
}))

const setup = () => {
  render(<Common {...Common?.args} />)
}

describe('[component] Wishlist Template component', () => {
  it('should render the wishlist component', () => {
    setup()

    const wishlistTemplate = screen.getByTestId('wishlist-template')

    expect(wishlistTemplate).toBeInTheDocument()
  })
})
