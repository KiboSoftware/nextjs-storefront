import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import * as cookienext from 'cookies-next'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '@/__test__/utils/createMockRouter'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { CartTemplateProps } from '@/components/page-templates/CartTemplate/CartTemplate'
import * as stories from '@/components/page-templates/CartTemplate/CartTemplate.stories'
import { DialogRoot, ModalContextProvider } from '@/context'

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
  }
}

describe('[components] CartTemplate integration', () => {
  afterEach(() => {
    jest.clearAllMocks()
    cleanup()
  })

  it('should render component', async () => {
    setup()
    const items = Common.args?.cart?.items || []
    const cartTitle = screen.getByText(/cart:shopping-cart/i)
    const cartItemCount = screen.getByText(/cart:cart-item-count/i)
    const orderSummaryHeading = screen.getByText('order-summary')

    const gotToCheckout = screen.getByRole('button', {
      name: /go-to-checkout/i,
    })

    items?.map((_item, index: number) => {
      expect(screen.getAllByText(/Available to Ship/i)[index]).toBeVisible()
    })
    expect(cartTitle).toBeVisible()
    expect(cartItemCount).toBeVisible()
    expect(orderSummaryHeading).toBeVisible()

    expect(gotToCheckout).toBeVisible()
    expect(gotToCheckout).toBeEnabled()
  })

  it('should update quantity  when click "+" button', async () => {
    const { user } = setup()
    const inputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(inputs[0]).toHaveValue('2')
    const plusButton = screen.getAllByRole('button', { name: 'increase' })
    const button = plusButton[0]
    await user.click(button)
    const newInputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(newInputs[0]).toHaveValue('3')
  })

  it('should update quantity  when click "-" button', async () => {
    const { user } = setup()
    const inputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(inputs[0]).toHaveValue('3')
    const minusButton = screen.getAllByRole('button', { name: 'decrease' })
    const button = minusButton[0]
    await user.click(button)
    const newInputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(newInputs[0]).toHaveValue('2')
  })

  // it('should delete cart Item  when click delete icon', async () => {
  //   const { user } = setup()

  //   const cartItem = screen.getAllByRole('group')
  //   expect(cartItem).toHaveLength(2)

  //   const deleteButton = screen.getAllByRole('button', { name: 'item-delete' })
  //   await user.click(deleteButton[0])
  //   const deletedCartItem = screen.queryByText('Pink Backpack')
  //   await waitFor(() => expect(deletedCartItem).not.toBeInTheDocument())
  // })

  it('should selected ship to home item into the cart', async () => {
    const { user } = setup()
    const shipRadio = screen.getAllByRole('radio', {
      name: /ship to home/i,
    })
    await user.click(shipRadio[1])

    await waitFor(() => expect(shipRadio[1]).toBeChecked())
  })

  it('should selected pickup item into the cart and show store selector dialog', async () => {
    const { user } = setup()
    const pickupRadio = screen.getAllByRole('radio', {
      name: /Pickup in store/i,
    })
    await user.click(pickupRadio[0])
    const selectStore = screen.queryAllByText('select-store')

    expect(selectStore[0]).toBeVisible()
  })

  // it('should selected pickup item into the cart with purchase location from cookie', async () => {
  //   const mockSetCookie = jest.spyOn(cookienext, 'setCookie')
  //   cookienext.setCookie('kibo_purchase_location', 'Richmond')
  //   Object.defineProperty(window.document, 'cookie', {
  //     writable: true,
  //     value: 'kibo_purchase_location=Richmond',
  //   })

  //   const { user } = setup()
  //   const pickupRadio = screen.getAllByRole('radio', {
  //     name: /Pickup in store/i,
  //   })
  //   await user.click(pickupRadio[0])
  //   expect(pickupRadio[0]).toBeChecked()
  // })
})
