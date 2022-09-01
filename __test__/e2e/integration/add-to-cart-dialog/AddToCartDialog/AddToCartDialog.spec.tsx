import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '@/__test__/utils/createMockRouter'
import * as stories from '@/components/dialogs/AddToCartConfirmation/AddToCartDialog/AddToCartDialog.stories' // import all stories from the stories file
import { DialogRoot, ModalContextProvider, useModalContext } from '@/context'

const { Common } = composeStories(stories)

jest.mock(
  'next/link',
  () =>
    ({ children }: any) =>
      children
)

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
  const router = createMockRouter()

  render(
    <RouterContext.Provider value={router}>
      <ModalContextProvider>
        <TestComponent />
      </ModalContextProvider>
    </RouterContext.Provider>
  )

  return {
    user,
    router,
  }
}

describe('[components] Add To Cart Dialog integration', () => {
  it('should render component', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const item = Common.args?.cartItem
    const name = item?.product?.name || ''

    const component = screen.getByRole('dialog')
    const title = screen.getAllByRole('heading', { name: /added-to-cart/i })[0]
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    const productName = screen.getByText(name)
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
    expect(taxSubTotal).toHaveLength(4)
    expect(goToCartButton).toBeVisible()
    expect(continueShoppingButton).toBeVisible()
  })

  it('should close dialog when user clicks on closeIcon button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const dialog = screen.getByRole('dialog')
    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    await user.click(closeIconButton)

    expect(dialog).not.toBeVisible()
    expect(closeIconButton).not.toBeVisible()
  })

  it('should redirect to /cart page when user clicks on "Add To Cart" button', async () => {
    const { user, router } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const dialog = screen.getByRole('dialog')
    const goToCartButton = screen.getByRole('button', {
      name: /go\-to\-cart/i,
    })

    expect(dialog).toBeVisible()
    expect(goToCartButton).toBeVisible()

    await user.click(goToCartButton)

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/cart')
    })

    expect(dialog).not.toBeVisible()
    expect(goToCartButton).not.toBeVisible()
  })

  it('should close dialog when user clicks on "Continue Shopping" button', async () => {
    const { user } = setup()

    const showModalButton = screen.getByRole('button', { name: 'Show Modal' })
    await user.click(showModalButton)

    const dialog = screen.getByRole('dialog')
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(dialog).toBeVisible()
    expect(continueShoppingButton).toBeVisible()

    await user.click(continueShoppingButton)

    expect(dialog).not.toBeVisible()
    expect(continueShoppingButton).not.toBeVisible()
  })
})
