import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './ListItem.stories'
const { Common } = composeStories(stories)
const { lineItem } = stories

const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => jest.fn(),
  removeListener: () => jest.fn(),
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

jest.mock('@/components/common/QuantitySelector/QuantitySelector', () => ({
  __esModule: true,
  default: ({
    onDecrease,
    onIncrease,
    quantity,
    onQuantityUpdate,
  }: {
    quantity: number
    label?: string
    maxQuantity?: number
    onIncrease?: () => void
    onDecrease?: () => void
    onQuantityUpdate?: (quantity: number) => void
  }) => (
    <div data-testid="quantity-selector">
      <button onClick={onDecrease} data-testid="decrease-button">
        Decrease
      </button>
      <input value={quantity} data-testid="change-input" onChange={onQuantityUpdate as any} />
      <button onClick={onIncrease} data-testid="increase-button">
        Increase
      </button>
    </div>
  ),
}))

const onDeleteItemMock = jest.fn()
const onChangeQuantityMock = jest.fn()

const setup = () => {
  const user = userEvent.setup()
  render(
    <Common
      {...Common.args}
      onDeleteItem={onDeleteItemMock}
      onChangeQuantity={onChangeQuantityMock}
    />
  )
  return { user }
}

describe('[component] - ListItem', () => {
  it('should render list item', () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    expect(screen.getByText(lineItem.product.name)).toBeVisible()
    expect(screen.getByText(/total/i)).toBeVisible()
    expect(screen.getByText(/qty/i)).toBeVisible()
    expect(screen.getByText(lineItem.product.productCode)).toBeVisible()
    expect(screen.getByTestId('quantity-selector')).toBeVisible()
  })

  it('should delete item', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const deleteBtn = screen.getByText(/remove/i)
    user.click(deleteBtn)
    await waitFor(() => {
      expect(onDeleteItemMock).toBeCalled()
    })
  })

  it('should increase item quantity', async () => {
    const { user } = setup()
    const quantitySelector = screen.getByTestId('quantity-selector')
    const increaseBtn = within(quantitySelector).getByTestId('increase-button')
    user.click(increaseBtn)
    await waitFor(() => {
      expect(within(quantitySelector).getByTestId('change-input')).toHaveValue(
        lineItem.quantity.toString()
      )
    })
    await waitFor(() => {
      expect(onChangeQuantityMock).toBeCalled()
    })
  })

  it('should decrease item quantity', async () => {
    const { user } = setup()
    const quantitySelector = screen.getByTestId('quantity-selector')
    const decreaseBtn = within(quantitySelector).getByTestId('decrease-button')
    user.click(decreaseBtn)
    await waitFor(() => {
      expect(within(quantitySelector).getByTestId('change-input')).toHaveValue(
        lineItem.quantity.toString()
      )
    })
    await waitFor(() => {
      expect(onChangeQuantityMock).toBeCalled()
    })
  })

  it('should update item quantity', async () => {
    const { user } = setup()
    const quantitySelector = screen.getByTestId('quantity-selector')
    const quantityUpdateInput = within(quantitySelector).getByTestId('change-input')
    user.type(quantityUpdateInput, '3')
    await waitFor(() => {
      expect(within(quantitySelector).getByTestId('change-input')).toHaveValue(
        lineItem.quantity.toString()
      )
    })
    await waitFor(() => {
      expect(onChangeQuantityMock).toBeCalled()
    })
  })

  it('should open ProductView dialog', async () => {
    setup()
    const modalBtn = screen.getByTestId('product-modal-btn')
    expect(modalBtn).toBeVisible()

    fireEvent.click(modalBtn)

    const productModal = screen.getByTestId('product-modal')
    expect(productModal).toBeVisible()

    expect(within(productModal).getByText(lineItem.product.name)).toBeVisible()
  })
})
