import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductItem.stories'

const {
  Common,
  WithEmptyDetailOption,
  WithQtyLabel,
  WithChangeStoreOption: WithChangeStoreOption,
  WithoutOptionsForInventory,
} = composeStories(stories)

const imageMock = () => <div data-testid="image-component" />
jest.mock('@/components/common/KiboImage/KiboImage', () => () => imageMock())
const priceMock = () => <div data-testid="price-component" />
jest.mock('@/components/common/Price/Price', () => () => priceMock())

const productOptionListMock = () => <div data-testid="product-option-list-component" />
jest.mock(
  '@/components/product/ProductOptionList/ProductOptionList',
  () => () => productOptionListMock()
)

const onStoreLocatorClickMock = jest.fn()

describe('[component] - ProductItem', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    expect(screen.getByText(/Qty/i)).toBeInTheDocument()
    expect(screen.getByRole('heading')).toBeVisible()
    expect(screen.getByText(`${Common.args?.name}`)).toBeVisible()
    expect(screen.getByTestId('image-component')).toBeVisible()
    expect(screen.getByTestId('price-component')).toBeVisible()
  })
})

describe('[component] - ProductItem with Price and Pickup Item', () => {
  it('should render component with price and qty', () => {
    render(<WithQtyLabel {...WithQtyLabel.args} />)

    const detailsElement = screen.queryByText(/details/i)
    const price = screen.getByText(WithQtyLabel?.args?.price || '')

    expect(detailsElement).toBeInTheDocument()
    expect(screen.getByTestId('product-option-list-component')).toBeVisible()
    expect(screen.getByText(/Qty/i)).toBeInTheDocument()
    expect(screen.getByText(`${WithQtyLabel.args?.qty}`)).toBeVisible()
    expect(price).toBeVisible()
  })

  it('should render component with change store', () => {
    render(<WithChangeStoreOption {...WithChangeStoreOption.args} />)

    const detailsElement = screen.queryByText(/details/i)
    const price = screen.getByText(WithChangeStoreOption?.args?.price || '')

    expect(detailsElement).toBeInTheDocument()
    expect(screen.getByText(/estimated-pickup:/i)).toBeVisible()
    expect(screen.getByTestId('product-option-list-component')).toBeVisible()
    expect(screen.getByText(/Qty/i)).toBeInTheDocument()
    expect(screen.getByText(`${WithChangeStoreOption.args?.expectedDeliveryDate}`)).toBeVisible()
    expect(screen.getByText(`${WithChangeStoreOption.args?.qty}`)).toBeVisible()
    expect(price).toBeVisible()
  })

  it('should call onStoreLocatorClickMock when click onStoreLocatorClick', async () => {
    const user = userEvent.setup()
    render(
      <WithChangeStoreOption
        {...WithChangeStoreOption.args}
        isPickupItem={true}
        onStoreLocatorClick={onStoreLocatorClickMock}
      />
    )
    const changeStore = WithChangeStoreOption.args?.purchaseLocation
      ? screen.getByText(/change-store/i)
      : screen.getByText(/select-store/i)

    await user.click(changeStore)
    expect(onStoreLocatorClickMock).toHaveBeenCalled()
  })

  it('should not show details when no label(price,qty) or options is present', () => {
    render(<WithEmptyDetailOption {...WithEmptyDetailOption.args} />)

    const detailsElement = screen.queryByText(/details/i)
    expect(detailsElement).not.toBeInTheDocument()
  })

  it('should not show details when no options is present for inventory', () => {
    render(<WithoutOptionsForInventory {...WithoutOptionsForInventory.args} />)
    expect(screen.getByText(/Qty/i)).toBeInTheDocument()
    expect(screen.getByText(`${WithQtyLabel.args?.qty}`)).toBeVisible()
    expect(screen.getByTestId('price-component')).toBeVisible()
    expect(screen.queryByTestId('product-option-list-component')).not.toBeInTheDocument()
  })
})
