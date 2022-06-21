import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductItem.stories'

const { Common, WithPickupItem } = composeStories(stories)

const imageMock = () => <div data-testid="image-component" />
jest.mock('@/components/common/KiboImage/KiboImage', () => imageMock)
const priceMock = () => <div data-testid="price-component" />
jest.mock('@/components/common/Price/Price', () => priceMock)

const productOptionListMock = () => <div data-testid="product-option-list-component" />
jest.mock('@/components/product/ProductOptionList/ProductOptionList', () => productOptionListMock)

const onClickStoreLocatorMock = jest.fn()

describe('[component] - ProductItem', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productOptionList = screen.getByTestId('product-option-list-component')
    const detailsElement = screen.queryByText(/details/i)

    expect(screen.getByText(/Qty/i)).toBeInTheDocument()
    expect(screen.getByRole('heading')).toBeVisible()
    expect(screen.getByText(`${Common.args?.orderItem?.product?.name}`)).toBeVisible()
    expect(screen.getByTestId('image-component')).toBeVisible()
    expect(productOptionList).toBeVisible()
    expect(screen.getByTestId('price-component')).toBeVisible()
    expect(detailsElement).toBeInTheDocument()
  })
})

describe('[component] - ProductItem with Pickup Item', () => {
  const setup = () => {
    render(<WithPickupItem {...WithPickupItem.args} />)
  }

  it('should render component', () => {
    setup()
    expect(screen.getByText(/pickup:/i)).toBeVisible()
    expect(screen.getByText(/select-store/i)).toBeVisible()
    expect(screen.getByText(/Qty/i)).toBeInTheDocument()
    expect(screen.getByText(`${WithPickupItem.args?.orderItem?.quantity}`)).toBeVisible()
    const price = screen.getByText(WithPickupItem?.args?.orderItem?.product?.price?.price || '')
    expect(price).toBeVisible()
  })

  it('should call onClickStoreLocatorMock when click onClickStoreLocator', () => {
    render(
      <WithPickupItem
        {...WithPickupItem.args}
        isPickupItem={true}
        onClickStoreLocator={onClickStoreLocatorMock}
      />
    )
    const changeStore = screen.getByTestId('change-store-MS-BTL-004')

    userEvent.click(changeStore)
    expect(onClickStoreLocatorMock).toHaveBeenCalled()
  })
})
