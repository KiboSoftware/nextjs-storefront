import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { CartTemplateProps } from './CartTemplate'
import * as stories from './CartTemplate.stories'
import { server } from '@/__mocks__/msw/server'
import { createMockRouter, renderWithQueryClient } from '@/__test__/utils'
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

beforeEach(() => {
  cleanup()
})

describe('[components] CartTemplate', () => {
  it('should render component', async () => {
    setup()
    await waitFor(async () => {
      const cartTitle = screen.getByText(/shopping-cart/i)
      const cartItemCount = screen.getByText(/cart-item-count/i)
      const cartItemList = screen.getByTestId('cart-item-list-mock')
      const orderSummary = screen.getByTestId('cart-item-list-mock')

      expect(cartTitle).toBeVisible()
      await waitFor(async () => expect(cartItemCount).toBeVisible())
      await waitFor(async () => expect(cartItemList).toBeVisible())
      await waitFor(async () => expect(orderSummary).toBeVisible())
    })
  })

  it('should render empty cart when no items present in cart', async () => {
    const cartParams = { ...Common.args }
    if (cartParams.cart) cartParams.cart.items = []
    server.use(
      graphql.query('cart', (_req, res, ctx) => {
        return res(ctx.data({ currentCart: cartParams.cart }))
      })
    )

    const { user, router } = setup(cartParams as CartTemplateProps)
    await waitFor(async () => {
      const emptyCartSubTitle = screen.getByText(/empty-cart-message/)

      expect(emptyCartSubTitle).toBeVisible()
      const shopNowButton = screen.getByRole('button', { name: /shop-now/ })
      await user.click(shopNowButton)
      await waitFor(() => {
        expect(router.route).toBe('/')
      })
    })
  })
})
