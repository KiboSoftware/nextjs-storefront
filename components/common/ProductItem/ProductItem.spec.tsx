import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductItem.stories'

const { Common, WithoutDetailOption, WithPriceLabel, WithChageStoreOption } =
  composeStories(stories)

const priceMock = () => <div data-testid="price-component" />
jest.mock('@/components/common/Price/Price', () => priceMock)
const productOptionListMock = () => <div data-testid="product-option-list-component" />
jest.mock('@/components/product/ProductOptionList/ProductOptionList', () => productOptionListMock)
const onClickStoreLocatorMock = jest.fn()

describe('[component] - ProductItem', () => {
  const setup = () => {
    render(<WithPriceLabel {...WithPriceLabel.args} />)
  }

  it('should render component', () => {
    setup()

    const productDetails = screen.getByTestId('productDetails')
    const qty = screen.getByText(/Qty/i)
    const name = screen.getByRole('heading')
    const image = screen.getByRole('img')
    const productOptionList = screen.getByTestId('product-option-list-component')
    const price = screen.getByTestId('price-component')
    const detailsElement = screen.queryByText(/details/i)
    const priceLabel = screen.getByTestId('product-price')

    expect(productDetails).toBeVisible()
    expect(qty).toBeInTheDocument()
    expect(name).toBeVisible()
    expect(image).toHaveAttribute('alt', Common.args?.name)
    expect(productOptionList).toBeVisible()
    expect(price).toBeVisible()
    expect(priceLabel).toBeInTheDocument()
    expect(detailsElement).toBeInTheDocument()
  })

  it('should call onClickStoreLocatorMock when click onClickStoreLocator', () => {
    render(
      <WithChageStoreOption
        {...WithChageStoreOption.args}
        onClickStoreLocator={onClickStoreLocatorMock}
      />
    )
    const changeStore = screen.getByTestId('change-store')

    userEvent.click(changeStore)
    expect(onClickStoreLocatorMock).toHaveBeenCalled()
  })

  describe('when ProductItem has no label', () => {
    it('should not show details when no label(price,qty) or options is present', () => {
      render(<WithoutDetailOption {...WithoutDetailOption.args} />)

      const detailsElement = screen.queryByText(/details/i)
      expect(detailsElement).not.toBeInTheDocument()
    })
  })
})
