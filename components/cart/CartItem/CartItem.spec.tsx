import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CartItem.stories'

const { Common } = composeStories(stories)

const cartItemActionsMock = () => <div data-testid="cart-item-actions-component" />
jest.mock('@/components/cart/CartItemActions/CartItemActions', () => () => cartItemActionsMock())
const fulfillmentOptionsMock = () => <div data-testid="fulfillment-options-component" />
jest.mock(
  '@/components/common/FulfillmentOptions/FulfillmentOptions',
  () => () => fulfillmentOptionsMock()
)
const productItemMock = () => <div data-testid="cart-item-component" />
jest.mock('@/components/common/ProductItem/ProductItem', () => () => productItemMock())
const quantitySelectorMock = () => <div data-testid="quantity-selector-component" />
jest.mock(
  '@/components/common/QuantitySelector/QuantitySelector',
  () => () => quantitySelectorMock()
)
const cartItemActionsMobileMock = () => <div data-testid="cart-item-actions-mobile-component" />
jest.mock(
  '@/components/cart/CartItemActionsMobile/CartItemActionsMobile',
  () => () => cartItemActionsMobileMock()
)

describe('[components] - CartItem', () => {
  const setup = () => {
    const user = userEvent.setup()
    const onDeleteMock = jest.fn()
    render(<Common {...Common.args} onCartItemDelete={onDeleteMock} />)
    return {
      onDeleteMock,
      user,
    }
  }

  it('should render component', async () => {
    // arrange
    const { onDeleteMock, user } = setup()

    // act
    const cartItemAction = screen.getByTestId('cart-item-actions-component')
    const fulfillmentOptions = screen.getByTestId('fulfillment-options-component')
    const cartItem = screen.getByTestId('cart-item-component')
    const cartItemActionMobile = screen.getByTestId('cart-item-actions-mobile-component')
    const card = screen.getByRole('group')
    const deleteButton = screen.getByRole('button', { name: 'item-delete' })
    await user.click(deleteButton)

    // assert
    expect(cartItemAction).toBeVisible()
    expect(fulfillmentOptions).toBeVisible()
    expect(cartItem).toBeVisible()
    expect(cartItemActionMobile).toBeVisible()
    expect(card).toBeVisible()
    expect(deleteButton).toBeEnabled()
    expect(onDeleteMock).toHaveBeenCalledTimes(1)
  })
})
