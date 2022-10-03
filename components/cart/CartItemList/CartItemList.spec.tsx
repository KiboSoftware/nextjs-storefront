import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CartItemList.stories'

const { Common } = composeStories(stories)

const cartItemMock = () => <div data-testid="cart-item-component" />
jest.mock('@/components/cart/CartItem/CartItem', () => () => cartItemMock())

describe('[components] - CartItemList', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const cartItem = screen.getAllByTestId(/cart-item-component/i)

    // assert
    const count = Common.args?.cartItems?.length || 0
    expect(cartItem).toHaveLength(count)
  })
})
