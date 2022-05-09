import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductItem.stories'

const { Common, WithoutDetailOption } = composeStories(stories)

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
    const qty = screen.getByText(/Qty/i)
    const name = screen.getByRole('heading')
    const image = screen.getByRole('img')
    const productOptionList = screen.getByTestId('product-option-list-component')
    const price = screen.getByTestId('price-component')

    expect(productDetails).toBeVisible()
    expect(qty).toBeInTheDocument()
    expect(name).toBeVisible()
    expect(image).toHaveAttribute('alt', Common.args?.name)
    expect(productOptionList).toBeVisible()
    expect(price).toBeVisible()
  })

  describe('[component] - ProductItem without any label', () => {
    it('should not show details when no product label(price,qty) or options is present', () => {
      render(<WithoutDetailOption {...WithoutDetailOption.args} />)

      const detailsElement = screen.queryByText(/details/i)

      expect(detailsElement).not.toBeInTheDocument()
    })
  })
})
