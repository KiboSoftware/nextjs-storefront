import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CartTemplate.stories'

const CartItemListMock = ({ children }: { children: ReactNode }) => (
  <div data-testid="cart-item-list-mock">{children}</div>
)
const OrderSummaryMock = () => <div data-testid="order-summary-mock" />

jest.mock('../../cart/CartItemList/CartItemList', () => CartItemListMock)
jest.mock('../../common/OrderSummary/OrderSummary', () => OrderSummaryMock)

jest.mock('@/hooks', () => ({
  useCheckout: jest.fn(() => ({})),
  useUpdateCheckout: jest.fn(() => ({})),
}))

const { Common } = composeStories(stories)

describe('[components] CartTemplate', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()
    const cartTitle = screen.getByText(/cart:shopping-cart/i)
    const cartItemCount = screen.getByText(/cart:cart-item-count/i)
    const cartItemList = screen.getByTestId('cart-item-list-mock')
    const orderSummary = screen.getByTestId('cart-item-list-mock')

    expect(cartTitle).toBeVisible()
    expect(cartItemCount).toBeVisible()
    expect(cartItemList).toBeVisible()
    expect(orderSummary).toBeVisible()
  })
})
