import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductItem.stories'

const { Common, WithPriceLabel } = composeStories(stories)

describe('[component] - ProductItem', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productDetails = screen.getByTestId('productDetails')
    const qtyElement = screen.getByText(/Qty/i)

    expect(productDetails).toBeVisible()
    expect(qtyElement).toBeInTheDocument()
  })

  it('should render product name', () => {
    setup()

    const name = screen.getByRole('heading')

    expect(name).toBeVisible()
  })

  it('should render image', () => {
    setup()

    const image = screen.getByRole('img')

    expect(image).toHaveAttribute('alt', Common.args?.name)
  })

  it('should render product item options', () => {
    setup()

    const productItemOptions = screen.getAllByTestId('productOption')
    const items = Common.args?.options || []

    const count = items.length || 0
    expect(productItemOptions).toHaveLength(count)
  })
})

describe('[component] - ProductItem with Price Label', () => {
  const setup = () => {
    render(<WithPriceLabel {...WithPriceLabel.args} />)
  }

  it('should render component with price label inside details', () => {
    setup()

    const productDetails = screen.getByTestId('productDetails')
    const priceElement = screen.getByText(/price/i)

    expect(productDetails).toBeVisible()
    expect(priceElement).toBeInTheDocument()
  })

  it('should render product price with label', () => {
    setup()

    const price = screen.getByText(WithPriceLabel?.args?.price || 0)

    expect(price).toBeVisible()
  })
})
