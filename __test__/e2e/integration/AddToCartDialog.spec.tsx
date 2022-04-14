import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '../../utils/createMockRouter'
import * as stories from '@/components/add-to-cart-dialog/AddToCartDialog/AddToCartDialog.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

interface CartDetailsProps {
  fullfillmentOption: string
  quantity: number
  subtotal: number
  tax: number
  total: number
  isOpen: boolean
  isCenteredDialog: boolean
}

describe('[components] Add To Cart Dialog integration', () => {
  const setup = (params: CartDetailsProps) => render(<Common {...params} onClose={onCloseMock} />)

  it('should render component', async () => {
    setup({
      fullfillmentOption: 'free',
      quantity: 2,
      subtotal: 219.99,
      tax: 13.73,
      total: 233.72,
      isOpen: true,
      isCenteredDialog: false,
    })

    const component = screen.getByRole('dialog')
    const title = screen.getByText(/add-to-cart/i)
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    const fullfillmentOption = screen.getByText(`${Common.args?.fullfillmentOption}`)
    const taxSubTotalTotal = screen.getAllByText(/currency/i)
    const goToCartButton = screen.getByRole('button', {
      name: /go-to-cart/i,
    })
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(component).toBeVisible()
    expect(title).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(fullfillmentOption).toBeVisible()
    expect(taxSubTotalTotal).toHaveLength(3)
    expect(goToCartButton).toBeVisible()
    expect(continueShoppingButton).toBeVisible()
  })

  it('should close dialog when user clicks on closeIcon button', () => {
    setup({
      fullfillmentOption: 'free',
      quantity: 2,
      subtotal: 219.99,
      tax: 13.73,
      total: 233.72,
      isOpen: true,
      isCenteredDialog: false,
    })

    const dialog = screen.getByRole('dialog')
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    userEvent.click(closeIconButton)

    expect(dialog).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('should redirect to /cart page when user clicks on "Add To Cart" button', async () => {
    setup({
      fullfillmentOption: 'free',
      quantity: 2,
      subtotal: 219.99,
      tax: 13.73,
      total: 233.72,
      isOpen: true,
      isCenteredDialog: false,
    })

    const router = createMockRouter()

    render(
      <RouterContext.Provider value={router}>
        <Common />;
      </RouterContext.Provider>
    )

    const dialog = screen.getByRole('dialog')
    const goToCartButton = screen.getByRole('button', {
      name: /go\-to\-cart/i,
    })

    expect(dialog).toBeVisible()
    expect(goToCartButton).toBeVisible()

    userEvent.click(goToCartButton)

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/cart')
    })
    expect(goToCartButton).not.toBeVisible()
  })

  it('should close dialog when user clicks on "Continue Shopping" button', async () => {
    setup({
      fullfillmentOption: 'free',
      quantity: 2,
      subtotal: 219.99,
      tax: 13.73,
      total: 233.72,
      isOpen: true,
      isCenteredDialog: false,
    })

    const dialog = screen.getByRole('dialog')
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(dialog).toBeVisible()
    expect(continueShoppingButton).toBeVisible()

    await userEvent.click(continueShoppingButton)

    expect(continueShoppingButton).not.toBeVisible()
  })
})
