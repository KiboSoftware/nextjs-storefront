import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, screen, waitFor, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/page-templates/CartTemplate/CartTemplate.stories'
const { Common } = composeStories(stories)

const setup = (params) => {
  const props = params.id ? params : Common.args
  const user = userEvent.setup()
  render(<Common {...props} />)
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
    const props = { ...Common.args }
    setup(props)

    const cartTitle = screen.getByText(/cart:shopping-cart/i)
    const cartItemCount = screen.getByText(/cart:cart-item-count/i)
    const orderSummaryHeading = screen.getByText('order-summary')

    const gotToCheckout = screen.getByRole('button', {
      name: /go-to-checkout/i,
    })
    expect(cartTitle).toBeVisible()
    expect(cartItemCount).toBeVisible()
    expect(orderSummaryHeading).toBeVisible()

    expect(gotToCheckout).toBeVisible()
    expect(gotToCheckout).toBeEnabled()
  })

  it('should update quantity  when click "+" button', async () => {
    const props = { ...Common.args }
    const { user } = setup(props)
    let inputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(inputs[0]).toHaveValue('2')
    const plusButton = screen.getAllByRole('button', { name: 'increase' })
    const button = plusButton[0]
    await user.click(button)
    let newInputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(newInputs[0]).toHaveValue('3')
  })

  it('should update quantity  when click "-" button', async () => {
    const props = { ...Common.args }
    const { user } = setup(props)
    let inputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(inputs[0]).toHaveValue('3')
    const minusButton = screen.getAllByRole('button', { name: 'decrease' })
    const button = minusButton[0]
    await user.click(button)
    let newInputs = screen.getAllByRole('textbox', { name: 'quantity' })
    expect(newInputs[0]).toHaveValue('2')
  })

  it('should delete cart Item  when click delete icon', async () => {
    const props = { ...Common.args }

    const { user } = setup(props)

    const cartItem = screen.getAllByRole('group')
    expect(cartItem).toHaveLength(2)

    const deleteButton = screen.getAllByRole('button', { name: 'item-delete' })
    await user.click(deleteButton[0])
    const deletedCartItem = screen.queryByText('Pink Backpack')
    await waitFor(() => expect(deletedCartItem).not.toBeInTheDocument())
  })
})
