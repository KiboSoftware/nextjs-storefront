import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductCardListView.stories' // import all stories from the stories file

const { Common, LoadingProductCard } = composeStories(stories)

let isInWishlistMock = false
const onAddOrRemoveWishlistItemMock = jest.fn()
const onClickQuickViewModalMock = jest.fn()
const onClickAddToCartMock = jest.fn()
const setup = () => {
  const user = userEvent.setup()
  render(
    <Common
      {...Common.args}
      isInWishlist={isInWishlistMock}
      onAddOrRemoveWishlistItem={onAddOrRemoveWishlistItemMock}
      onClickQuickViewModal={onClickQuickViewModalMock}
      onClickAddToCart={onClickAddToCartMock}
    />
  )
  return {
    user,
  }
}

describe('[components] Product Card List View Component', () => {
  it('should render component', () => {
    setup()

    const title = screen.getByText(/Test Product/i)
    const badge = screen.getByText(/New/i)
    const price = screen.getByText('$19.98')
    const image = screen.getByTestId('product-image')
    const rating = screen.getByTestId('product-rating')
    const emptyRating = screen.getAllByTestId('empty-rating')
    const notInWishlistIcon = screen.getByTestId('FavoriteBorderRoundedIcon')
    const quickViewButton = screen.getByText(/quick-view/i)
    const addToCartButton = screen.getByRole('button', {
      name: /add-to-cart/i,
    })

    expect(title).toBeVisible()
    expect(badge).toBeVisible()
    expect(price).toBeVisible()
    expect(image).toHaveAttribute('alt', 'Product image alt text')
    expect(rating).toBeVisible()
    expect(emptyRating).toHaveLength(2)
    expect(notInWishlistIcon).toBeInTheDocument()
    expect(quickViewButton).toBeVisible()
    expect(addToCartButton).toBeInTheDocument()
  })

  it('should call AddOrRemoveWishlistItem when user clicks on wishlist icons', async () => {
    isInWishlistMock = true
    const { user } = setup()

    const inWishlistIcon = screen.getByTestId('FavoriteRoundedIcon')
    const notInWishlistIcon = screen.queryByTestId('FavoriteBorderRoundedIcon')

    expect(notInWishlistIcon).not.toBeInTheDocument()
    expect(inWishlistIcon).toBeVisible()

    act(() => {
      user.click(inWishlistIcon)
    })

    await waitFor(() => {
      expect(onAddOrRemoveWishlistItemMock).toBeCalled()
    })
  })

  it('should call onClickQuickViewModal method when user clicks on quick-view button', async () => {
    const { user } = setup()

    const quickViewButton = screen.getByText(/quick-view/i)
    act(() => {
      user.click(quickViewButton)
    })

    await waitFor(() => {
      expect(onClickQuickViewModalMock).toBeCalled()
    })
  })

  it('should call onClickAddToCart method when user clicks on quick-view button', async () => {
    const { user } = setup()

    const addToCartButton = screen.getByRole('button', {
      name: /add-to-cart/i,
    })
    act(() => {
      user.click(addToCartButton)
    })

    await waitFor(() => {
      expect(onClickAddToCartMock).toBeCalled()
    })
  })
})

describe('Product Card Skeleton', () => {
  it('should render Product Card skeleton', () => {
    render(<LoadingProductCard {...LoadingProductCard.args} />)

    const skeleton = screen.getByTestId('product-card-skeleton')
    expect(skeleton).toBeVisible()
  })
})
