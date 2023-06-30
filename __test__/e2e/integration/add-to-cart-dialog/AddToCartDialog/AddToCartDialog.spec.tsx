import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import * as stories from '@/components/dialogs/AddToCartConfirmation/AddToCartDialog/AddToCartDialog.stories' // import all stories from the stories file
import { DialogRoot, ModalContextProvider, useModalContext } from '@/context'

const { Common } = composeStories(stories)

const TestComponent = () => {
  const { showModal } = useModalContext()

  const showYourModal = () => {
    showModal({ Component: Common, props: Common.args })
  }

  return (
    <div>
      <DialogRoot />
      <button data-testid="show-modal" onClick={showYourModal}>
        Show Modal
      </button>
    </div>
  )
}

const setup = () => {
  const user = userEvent.setup()

  render(
    <ModalContextProvider>
      <TestComponent />
    </ModalContextProvider>
  )

  return {
    user,
  }
}

describe('[components] Add To Cart Dialog integration', () => {
  it('should render component', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    const item = Common.args?.cartItem
    const name = item?.product?.name || ''

    await waitFor(() => {
      const component = screen.getByRole('dialog')
      expect(component).toBeVisible()
    })

    const title = screen.getAllByRole('heading', { name: /added-to-cart/i })[0]
    expect(title).toBeVisible()

    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    expect(closeIconButton).toBeVisible()

    const productName = screen.getByText(name)
    expect(productName).toBeInTheDocument()

    const taxSubTotal = screen.getAllByText(/currency/i)
    expect(taxSubTotal).toHaveLength(4)

    const goToCartButton = screen.getByRole('button', {
      name: /go-to-cart/i,
    })
    expect(goToCartButton).toBeVisible()

    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })
    expect(continueShoppingButton).toBeVisible()
  })

  it('should close dialog when user clicks on closeIcon button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    await waitFor(() => {
      const closeIconButton = screen.getByRole('button', {
        name: /close/i,
      })
      user.click(closeIconButton)
    })

    const dialog = await screen.findByRole('dialog')
    expect(dialog).not.toBeVisible()
  })

  it('should redirect to /cart page when user clicks on "Add To Cart" button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toBeVisible()

    const goToCartButton = await screen.findByRole('button', {
      name: /go\-to\-cart/i,
    })
    expect(goToCartButton).toBeVisible()

    user.click(goToCartButton)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/cart',
        pathname: '/cart',
        query: {},
      })
    })

    expect(dialog).not.toBeVisible()
    expect(goToCartButton).not.toBeVisible()
  })

  it('should close dialog when user clicks on "Continue Shopping" button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    user.click(showModalButton)

    const dialog = await screen.findByRole('dialog')
    const continueShoppingButton = await screen.findByRole('button', {
      name: /continue-shopping/i,
    })

    expect(dialog).toBeVisible()
    expect(continueShoppingButton).toBeVisible()

    user.click(continueShoppingButton)

    await waitFor(() => {
      expect(dialog).not.toBeVisible()
    })

    expect(continueShoppingButton).not.toBeVisible()
  })
})
