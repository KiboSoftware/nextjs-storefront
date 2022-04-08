import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductItem.stories'

const { Common, WithPriceLabel } = composeStories(stories)

// const priceMock = () => <div data-testid="price-component" />
// jest.mock('@/components/common/Price/Price', () => priceMock)
const productOptionListMock = () => <div data-testid="product-option-list-component" />
jest.mock('@/components/product/ProductOptionList/ProductOptionList', () => productOptionListMock)

describe('[component] - ProductItem', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productDetails = screen.getByTestId('productDetails')
    const qtyElement = screen.getByText(/Qty/i)
    const name = screen.getByRole('heading')
    const image = screen.getByRole('img')

    expect(productDetails).toBeVisible()
    expect(qtyElement).toBeInTheDocument()
    expect(name).toBeVisible()
    expect(image).toHaveAttribute('alt', Common.args?.name)
  })

  it('should render mock component', () => {
    // arrange
    setup()

    // act
    const productOptionList = screen.getByTestId('product-option-list-component')

    // // assert
    expect(productOptionList).toBeVisible()
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
    const price = screen.getByText(WithPriceLabel?.args?.price || 0)

    expect(productDetails).toBeVisible()
    expect(priceElement).toBeInTheDocument()
    expect(price).toBeVisible()
  })
})
