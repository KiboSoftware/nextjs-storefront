import React, { ReactNode } from 'react'

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import CartTemplate from './CartTemplate'
import { cartMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider, DialogRoot } from '@/context'

jest.mock('../../cart/CartItemList/CartItemList', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="cart-item-list-mock">{children}</div>
  ),
}))
jest.mock('../../common/OrderSummary/OrderSummary', () => ({
  __esModule: true,
  default: () => <div data-testid="order-summary-mock" />,
}))

const setup = (isCartEmpty = false) => {
  const user = userEvent.setup()

  if (isCartEmpty) cartMock.currentCart.items = []
  const cart = cartMock.currentCart

  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <CartTemplate isMultiShipEnabled={true} cart={cart} />
    </ModalContextProvider>
  )
  return {
    user,
  }
}

describe('[components] CartTemplate', () => {
  it('should render component', async () => {
    setup()

    const cartTitle = screen.getByText(/shopping-cart/i)
    const cartItemCount = screen.getByText(/cart-item-count/i)
    const cartItemList = screen.getByTestId('cart-item-list-mock')
    const orderSummary = screen.getByTestId('cart-item-list-mock')

    expect(cartTitle).toBeVisible()
    await waitFor(async () => expect(cartItemCount).toBeVisible())
    await waitFor(async () => expect(cartItemList).toBeVisible())
    await waitFor(async () => expect(orderSummary).toBeVisible())
  })

  it('should render empty cart when no items present in cart', async () => {
    const isCartEmpty = true
    const { user } = setup(isCartEmpty)

    const emptyCartSubTitle = await screen.findByText(/empty-cart-message/)
    expect(emptyCartSubTitle).toBeVisible()

    const shopNowButton = screen.getByRole('button', { name: /shop-now/ })
    await user.click(shopNowButton)

    expect(mockRouter).toMatchObject({
      pathname: '/',
    })
  })
})
