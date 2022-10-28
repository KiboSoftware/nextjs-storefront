import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductCard.stories' // import all stories from the stories file

const {
  Common,
  WithSalePrice,
  WithRating,
  NoImage,
  LoadingProductCard,
  WithWishlist,
  WithQuickViewButton,
} = composeStories(stories)

const onAddOrRemoveWishlistItemMock = jest.fn()
const wishlistSetup = () => {
  const user = userEvent.setup()
  render(
    <WithWishlist
      {...WithWishlist.args}
      onAddOrRemoveWishlistItem={onAddOrRemoveWishlistItemMock}
    />
  )
  return {
    user,
  }
}

const onClickQuickViewModalMock = jest.fn()
const quickViewSetup = () => {
  const user = userEvent.setup()
  render(
    <WithQuickViewButton
      {...WithQuickViewButton.args}
      onClickQuickViewModal={onClickQuickViewModalMock}
    />
  )
  return {
    user,
  }
}

describe('[components] Product Card Component', () => {
  describe('Common Product Card', () => {
    const setup = () => render(<Common {...Common.args} />)

    it('should render title', () => {
      setup()

      const title = screen.getByText(Common.args.title)

      expect(title).toBeVisible()
    })

    it('should render price', () => {
      setup()

      const price = screen.getByText(Common.args.price)

      expect(price).toBeVisible()
    })

    it('should render product image', () => {
      setup()

      const image = screen.getByTestId('product-image')

      expect(image).toHaveAttribute('alt', 'product-image-alt')
    })

    it('should render rating component', () => {
      setup()

      const rating = screen.getByTestId('product-rating')

      expect(rating).toBeVisible()
    })

    describe('when not providing rating prop', () => {
      it('should show empty rating', () => {
        setup()

        const emptyRating = screen.getAllByTestId('empty-rating')

        expect(emptyRating).toHaveLength(10)
      })
    })
  })

  describe('Sale Price Product Card', () => {
    it('should render sale price text', () => {
      render(<WithSalePrice {...WithSalePrice.args} />)

      const salePrice = screen.getByText(WithSalePrice.args.salePrice)

      expect(salePrice).toBeVisible()
    })
  })

  describe('Rating Product Card', () => {
    it('should render rating component with provided rating value', () => {
      render(<WithRating {...WithRating.args} />)

      const filledRating = screen.getAllByTestId('filled-rating')

      expect(filledRating).toHaveLength(WithRating.args.rating * 2)
    })
  })

  describe('No Image Product Card', () => {
    it('should render Common Image placeholder', () => {
      render(<NoImage {...NoImage.args} />)

      const image = screen.getByTestId('product-image')

      expect(image).toHaveAttribute('alt', 'no-image-alt')
    })
  })

  describe('Product Card Skeleton', () => {
    it('should render Product Card skeleton', () => {
      render(<LoadingProductCard {...LoadingProductCard.args} />)

      const skeleton = screen.getByTestId('product-card-skeleton')

      expect(skeleton).toBeVisible()
    })
  })
  describe('Wishlist Product Card', () => {
    it('should render Product Card with wishlist icon and shop now button', async () => {
      wishlistSetup()

      const inWishlistIcon = screen.getByTestId('FavoriteRoundedIcon')
      const notInWishlistIcon = screen.queryByTestId('FavoriteBorderRoundedIcon')
      const shopNowButton = screen.getAllByRole('button', {
        name: /shop-now/i,
      })

      expect(inWishlistIcon).toBeVisible()
      expect(notInWishlistIcon).not.toBeInTheDocument()
      expect(shopNowButton[0]).toBeVisible()
    })

    it('should render Product Card without in wishlist icon and shop now button', async () => {
      render(<WithWishlist {...WithWishlist.args} isInWishlist={false} isShopNow={false} />)
      const inWishlistIcon = screen.queryByTestId('FavoriteRoundedIcon')
      const notInWishlistIcon = screen.getByTestId('FavoriteBorderRoundedIcon')
      const shopNowButton = screen.queryByRole('link', {
        name: /shop-now/i,
      })

      expect(inWishlistIcon).not.toBeInTheDocument()
      expect(notInWishlistIcon).toBeVisible()
      expect(shopNowButton).not.toBeInTheDocument()
    })

    it('should call onAddOrRemoveWishlistItem method when user clicks on wishlist icons', async () => {
      const { user } = wishlistSetup()
      const inWishlistIcon = screen.getByTestId('FavoriteRoundedIcon')

      await user.click(inWishlistIcon)

      expect(onAddOrRemoveWishlistItemMock).toBeCalled()
    })
  })

  describe('Product Card with Quick-View Button', () => {
    it('should  render Product Card without quick-view button', async () => {
      quickViewSetup()

      const quickViewButton = screen.getAllByRole('button', {
        name: /quick-view/i,
      })

      expect(quickViewButton[0]).not.toBeVisible()
    })

    it('should call onClickQuickViewModal method when user clicks on quick-view button', async () => {
      const { user } = quickViewSetup()

      const quickViewButton = screen.getByRole('button', { name: /quick-view/i })
      await user.click(quickViewButton)

      expect(onClickQuickViewModalMock).toBeCalled()
    })
  })
})
