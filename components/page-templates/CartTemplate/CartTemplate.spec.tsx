import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { CartTemplateProps } from './CartTemplate'
import * as stories from './CartTemplate.stories'
import { server } from '@/__mocks__/msw/server'
import { createMockRouter, renderWithQueryClient } from '@/__test__/utils'
import { ModalContextProvider, DialogRoot } from '@/context'
const CartItemListMock = ({ children }: { children: ReactNode }) => (
  <div data-testid="cart-item-list-mock">{children}</div>
)
const OrderSummaryMock = () => <div data-testid="order-summary-mock" />

jest.mock('../../cart/CartItemList/CartItemList', () => CartItemListMock)
jest.mock('../../common/OrderSummary/OrderSummary', () => OrderSummaryMock)

const { Common } = composeStories(stories)
const setup = (params?: CartTemplateProps) => {
  const user = userEvent.setup()
  const router = createMockRouter()
  const props = params ? params : Common.args

  renderWithQueryClient(
    <RouterContext.Provider value={router}>
      <ModalContextProvider>
        <DialogRoot />
        <Common {...props} />
      </ModalContextProvider>
    </RouterContext.Provider>
  )
  return {
    user,
    router,
  }
}
describe('[components] CartTemplate', () => {
  it('should render component', async () => {
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

  it('should render empty cart when no items present in cart', async () => {
    const cartParams = { ...Common.args }
    if (cartParams.cart) cartParams.cart.items = []
    server.use(
      graphql.query('cart', (_req, res, ctx) => {
        return res.once(ctx.data({ currentCart: cartParams.cart }))
      })
    )

    const { user, router } = setup(cartParams as CartTemplateProps)
    await waitFor(async () => {
      const emptyCartSubTitle = screen.getByText(/cart:empty-cart-message/i)

      expect(emptyCartSubTitle).toBeVisible()
    })
    const shopNowButton = screen.getByRole('button', { name: /common:shop-now/i })
    await user.click(shopNowButton)
    await waitFor(() => {
      expect(router.route).toBe('/')
    })
  })
})
