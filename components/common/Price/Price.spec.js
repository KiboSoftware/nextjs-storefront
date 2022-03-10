import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { composeStories } from '@storybook/testing-react'

import * as stories from './Price.stories' // import all stories from the stories file
import theme from '../../../styles/theme'

const { PriceOnly, WithSalePrice, WithPriceRange } = composeStories(stories)

describe('[components] Price Component', () => {
  describe('when price is available', () => {
    it('should render price text', () => {
      render(<PriceOnly {...PriceOnly.args} />)

      const price = screen.getByText(PriceOnly.args.price)

      expect(price).toBeVisible()
    })
  })

  describe('when sale price is available', () => {
    it('should render price text', () => {
      render(<WithSalePrice {...WithSalePrice.args} />)

      const price = screen.getByText(WithSalePrice.args.price)

      expect(price).toBeVisible()

      expect(price).toHaveStyle(`color: ${theme.palette.error.main}`)
    })

    it('should render sale price text', () => {
      render(<WithSalePrice {...WithSalePrice.args} />)

      const salePrice = screen.getByText(WithSalePrice.args.salePrice)

      expect(salePrice).toBeVisible()
      expect(salePrice).toHaveStyle(`color: ${theme.palette.text.primary}`)
    })
  })

  describe('when price range is available', () => {
    it('should render price range text', () => {
      render(<WithPriceRange {...WithPriceRange.args} />)
      const priceRange = screen.getByText(
        `${WithPriceRange.args.priceRange.lower} - ${WithPriceRange.args.priceRange.upper}`
      )

      expect(priceRange).toBeVisible()
    })
  })
})
