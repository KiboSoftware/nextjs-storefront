import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { composeStories } from '@storybook/testing-react'

import * as stories from './Price.stories' // import all stories from the stories file
import theme from '../../../styles/theme'
const { PriceOnly, WithSalePrice, WithPriceRange } = composeStories(stories)

describe('Product Card Component', () => {
  it('should render Price component', () => {
    render(<PriceOnly {...PriceOnly.args} />)
    const price = screen.getByText(PriceOnly.args.price)

    expect(price).toBeVisible()
  })

  it('should render Price component with salePrice', () => {
    render(<WithSalePrice {...WithSalePrice.args} />)
    const price = screen.getByText(WithSalePrice.args.price)
    const salePrice = screen.getByText(WithSalePrice.args.price)

    expect(price).toBeVisible()
    expect(price).toHaveStyle(`color: ${theme.palette.error.main}`)
    expect(salePrice).toBeVisible()
  })

  it('should render Price component with WithPriceRange', () => {
    render(<WithPriceRange {...WithPriceRange.args} />)
    const priceRange = screen.getByTestId('price-range-text')

    expect(priceRange).toBeVisible()
  })
})
