import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Price.stories' // import all stories from the stories file
import theme from '@/styles/theme'

const { PriceOnly, WithSalePrice, WithPriceRange } = composeStories(stories)

describe('[components] Price Component', () => {
  describe('when price is available', () => {
    it('should render price text', () => {
      render(<PriceOnly {...PriceOnly.args} />)

      const price = screen.getByText(PriceOnly?.args?.price as string)

      expect(price).toBeVisible()
    })
  })

  describe('when sale price is available', () => {
    it('should render price text', () => {
      render(<WithSalePrice {...WithSalePrice.args} />)

      const price = screen.getByText(WithSalePrice?.args?.price as string)

      expect(price).toBeVisible()

      expect(price).toHaveStyle(`color: ${theme.palette.error.main}`)
    })

    it('should render sale price text', () => {
      render(<WithSalePrice {...WithSalePrice.args} />)

      const salePrice = screen.getByText(WithSalePrice?.args?.salePrice as string)

      expect(salePrice).toBeVisible()
      expect(salePrice).toHaveStyle(`color: ${theme.palette.text.primary}`)
    })
  })

  describe('when price range is available', () => {
    it('should render price range text', () => {
      render(<WithPriceRange {...WithPriceRange.args} />)

      const upperPrice = screen.getByText(WithPriceRange?.args?.priceRange?.upper.price as string)
      const upperSalePrice = screen.getByText(
        WithPriceRange?.args?.priceRange?.upper.salePrice as string
      )
      const lowerPrice = screen.getByText(WithPriceRange?.args?.priceRange?.lower.price as string)
      const lowerSalePrice = screen.getByText(
        WithPriceRange?.args?.priceRange?.lower.salePrice as string
      )

      expect(upperPrice).toBeVisible()
      expect(upperSalePrice).toBeVisible()
      expect(lowerPrice).toBeVisible()
      expect(lowerSalePrice).toBeVisible()
    })
  })
})
