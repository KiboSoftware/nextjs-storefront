import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './B2BProductDetailsTable.stories'
import { renderWithQueryClient } from '@/__test__/utils'

const { Common } = composeStories(stories)

const user = userEvent.setup()

const ProductItemMock = () => <div data-testid="product-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => ProductItemMock())

jest.mock('@/components/common/FulfillmentOptions/FulfillmentOptions', () => ({
  __esModule: true,
  default: ({ onFulfillmentOptionChange, onStoreSetOrUpdate }: any) => (
    <div data-testid="fulfillment-options-component">
      <button data-testid="onFulfillmentOptionChange-button" onClick={onFulfillmentOptionChange}>
        onFulfillmentOptionChange
      </button>
      <button data-testid="onStoreSetOrUpdate-button" onClick={onStoreSetOrUpdate}>
        onStoreSetOrUpdate
      </button>
    </div>
  ),
}))

jest.mock('@/components/common/QuantitySelector/QuantitySelector', () => ({
  __esModule: true,
  default: ({ onIncrease, onDecrease, onQuantityUpdate }: any) => (
    <div data-testid="quantity-selector-component">
      <button data-testid="onIncrease-button" onClick={onIncrease}>
        onIncrease
      </button>
      <button data-testid="onDecrease-button" onClick={onDecrease}>
        onDecrease
      </button>
      <button data-testid="onQuantityUpdate-button" onClick={onQuantityUpdate}>
        onQuantityUpdate
      </button>
    </div>
  ),
}))

const PriceMock = () => <div data-testid="price-component" />
jest.mock('@/components/common/Price/Price', () => () => PriceMock())

describe('[components] - QuickOrderTable', () => {
  it('should render table headers', () => {
    // arrange
    renderWithQueryClient(<Common {...Common.args} />)

    // act
    const productHeader = screen.queryByText(/product-header/i)
    const fulfillmentMethodHeader = screen.queryByText(/fulfillment-method-header/i)
    const quantityHeader = screen.queryByText(/quantity-header/i)
    const priceHeader = screen.queryByText(/price-header/i)
    const itemPriceHeader = screen.queryByText(/item-total-header/i)

    // assert
    expect(productHeader).toBeVisible()
    expect(fulfillmentMethodHeader).toBeVisible()
    expect(quantityHeader).toBeVisible()
    expect(priceHeader).toBeVisible()
    expect(itemPriceHeader).toBeVisible()
  })

  it("should render table with 'No Products Added' caption, if cart is empty", () => {
    // arrange
    renderWithQueryClient(<Common {...Common.args} items={[]} />)

    // act
    const cartItem = screen.queryAllByTestId(/product-item-component/i)

    // assert

    expect(cartItem.length).toBe(0)
  })

  it('should render table with passed items', () => {
    // arrange
    renderWithQueryClient(<Common {...Common.args} />)

    // act
    const productItems = screen.queryAllByTestId(/product-item-component/i)
    const fulfillmentOptions = screen.queryAllByTestId(/fulfillment-options-component/i)
    const quantitySelectors = screen.queryAllByTestId(/quantity-selector-component/i)
    const prices = screen.queryAllByTestId(/price-component/i)

    // assert
    const count = Common.args?.items?.length
    expect(productItems.length).toBe(count)
    expect(fulfillmentOptions.length).toBe(count)
    expect(quantitySelectors.length).toBe(count)
    expect(prices.length).toBe((count as number) * 3)
  })

  it('should call onQuantityUpdate when item quantity is changed', () => {
    // arrange
    const onQuantityUpdate = jest.fn()
    renderWithQueryClient(<Common {...Common.args} onQuantityUpdate={onQuantityUpdate} />)

    // act
    const quantitySelector = screen.queryAllByTestId(/quantity-selector-component/i)
    quantitySelector.forEach((selector, index) => {
      const onQuantityUpdateButton = screen.getAllByTestId('onQuantityUpdate-button')
      onQuantityUpdateButton[index].click()

      const onIncreaseButton = screen.getAllByTestId('onIncrease-button')
      onIncreaseButton[index].click()

      const onDecreaseButton = screen.getAllByTestId('onDecrease-button')
      onDecreaseButton[index].click()
    })

    // assert
    expect(onQuantityUpdate).toHaveBeenCalledTimes((Common.args?.items?.length as number) * 3)
  })

  it('should call onFulfillmentOptionChange when fulfillment option is changed', () => {
    // arrange
    const onFulfillmentOptionChange = jest.fn()
    renderWithQueryClient(
      <Common {...Common.args} onFulfillmentOptionChange={onFulfillmentOptionChange} />
    )
    const fulfillmentOptions = screen.queryAllByTestId(/fulfillment-options-component/i)

    // act
    fulfillmentOptions.forEach((option, index) => {
      const onFulfillmentOptionChangeButton = screen.getAllByTestId(
        'onFulfillmentOptionChange-button'
      )
      onFulfillmentOptionChangeButton[index].click()
    })

    // assert
    expect(onFulfillmentOptionChange).toHaveBeenCalledTimes(Common.args?.items?.length as number)
  })

  it('should call onStoreSetOrUpdate callback function when user selects store locator', () => {
    // arrange
    const onStoreSetOrUpdateMock = jest.fn()
    renderWithQueryClient(<Common {...Common.args} onStoreSetOrUpdate={onStoreSetOrUpdateMock} />)

    // assert
    Common.args?.items?.map(async (item, index) => {
      user.click(screen.getAllByTestId('onStoreSetOrUpdate-button')[index])

      await waitFor(() => {
        expect(onStoreSetOrUpdateMock).toHaveBeenCalledWith(item.id)
      })
    })
  })

  it('should call onItemDelete  when user deletes an Item', () => {
    // arrange
    const onItemDeleteMock = jest.fn()
    renderWithQueryClient(<Common {...Common.args} onItemDelete={onItemDeleteMock} />)

    // assert
    Common.args?.items?.map(async (item, index) => {
      user.click(screen.getAllByRole('button', { name: 'item-delete' })[index])

      await waitFor(() => {
        expect(onItemDeleteMock).toHaveBeenCalledWith(item.id)
      })
    })
  })
})
