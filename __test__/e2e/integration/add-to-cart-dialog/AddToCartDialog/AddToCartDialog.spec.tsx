import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '@/__test__/utils/createMockRouter'
import * as stories from '@/components/add-to-cart-dialog/AddToCartDialog/AddToCartDialog.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

describe('[components] Add To Cart Dialog integration', () => {
  const setup = () => render(<Common {...Common.args} onClose={onCloseMock} />)

  it('should render component', async () => {
    setup()

    const item = Common.args?.cartItem
    const name = item?.product?.name || ''

    const component = screen.getByRole('dialog')
    const title = screen.getByText(/add-to-cart/i)
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    const productName = screen.getByText(name)
    const fulfillmentMethod = screen.getByText(`${item?.fulfillmentMethod}`)
    const taxSubTotal = screen.getAllByText(/currency/i)
    const goToCartButton = screen.getByRole('button', {
      name: /go-to-cart/i,
    })
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(component).toBeVisible()
    expect(title).toBeVisible()
    expect(closeIconButton).toBeVisible()
    expect(productName).toBeInTheDocument()
    expect(fulfillmentMethod).toBeVisible()
    expect(taxSubTotal).toHaveLength(4)
    expect(goToCartButton).toBeVisible()
    expect(continueShoppingButton).toBeVisible()
  })

  it('should close dialog when user clicks on closeIcon button', () => {
    setup()

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
    setup()

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

  it('should close dialog when user clicks on "Continue Shopping" button', () => {
    setup()

    const dialog = screen.getByRole('dialog')
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(dialog).toBeVisible()
    expect(continueShoppingButton).toBeVisible()

    userEvent.click(continueShoppingButton)

    expect(continueShoppingButton).not.toBeVisible()
  })
})
