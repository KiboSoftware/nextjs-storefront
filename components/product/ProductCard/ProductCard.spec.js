import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { composeStories } from '@storybook/testing-react'

import * as stories from './ProductCard.stories' // import all stories from the stories file

const { Default, WithSalePrice, WithRating, NoImage, LoadingProductCard } = composeStories(stories)

describe('[components] Product Card Component', () => {
  describe('Default Product Card', () => {
    beforeEach(() => {
      render(<Default {...Default.args} />)
    })

    it('should render title', () => {
      const title = screen.getByText(Default.args.title)

      expect(title).toBeVisible()
    })

    it('should render price', () => {
      const price = screen.getByText(Default.args.price)

      expect(price).toBeVisible()
    })

    it('should render product image', () => {
      const image = screen.getByTestId('product-image')

      expect(image).toHaveAttribute('alt', 'product-image-alt')
    })

    it('should render rating component', () => {
      const rating = screen.getByTestId('product-rating')
      expect(rating).toBeVisible()
    })

    describe('when not providing rating prop', () => {
      it('should show empty rating', () => {
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
    it('should render default Image placeholder', () => {
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
})
