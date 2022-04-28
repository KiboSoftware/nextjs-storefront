import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductItem.stories'

const { Common, WithPriceLabel, WithQtyLabel, WithoutDetailOption } = composeStories(stories)

const priceMock = () => <div data-testid="price-component" />
jest.mock('@/components/common/Price/Price', () => priceMock)
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
    const price = screen.getByTestId('price-component')

    // // assert
    expect(productOptionList).toBeVisible()
    expect(price).toBeVisible()
  })
})

describe('[component] - ProductItem with Price Label', () => {
  const setup = () => {
    render(<WithPriceLabel {...WithPriceLabel.args} />)
  }

  it('should render component with price label inside details when price is provided', () => {
    setup()

    const productDetails = screen.getByTestId('productDetails')
    const priceElement = screen.getByText(/price/i)

    expect(productDetails).toBeVisible()
    expect(priceElement).toBeVisible()
  })
})

describe('[component] - ProductItem with Qty Label', () => {
  const setup = () => {
    render(<WithQtyLabel {...WithQtyLabel.args} />)
  }

  it('should render component with Qty label inside details when qty is provided', () => {
    setup()

    const productDetails = screen.getAllByTestId('productLabel')
    const qtyElement = screen.getByText(/qty/i)

    expect(productDetails).toHaveLength(2)
    expect(qtyElement).toBeVisible()
  })
})
describe('[component] - ProductItem without any label', () => {
  const setup = () => {
    render(<WithoutDetailOption {...WithoutDetailOption.args} />)
  }

  it('should not show details when no product label or oprions is present', () => {
    setup()

    const detailsElement = screen.queryByText(/details/i)

    expect(detailsElement).not.toBeInTheDocument()
  })
})
