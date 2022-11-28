import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/order/OrderReturnItems/OrderReturnItems.stories'
import { ModalContextProvider, DialogRoot } from '@/context'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  render(
    <ModalContextProvider>
      <DialogRoot />
      <Common {...Common.args} />
    </ModalContextProvider>
  )
  return {
    user,
  }
}
describe('[components] - OrderReturnItems Integration', () => {
  it('should render component', async () => {
    setup()

    const kiboSelectBtn = screen.getByRole('button', { name: 'choose-a-response' })

    expect(kiboSelectBtn).toBeInTheDocument()
    expect(kiboSelectBtn).toHaveTextContent('choose-a-response')
  })

  it('should disable "Confirm Return Request" button as default', async () => {
    setup()

    const confirmReturnRequestButton = screen.getByRole('button', {
      name: /confirm-return-request/i,
    })

    expect(confirmReturnRequestButton).toBeDisabled()
  })

  it('should have return reason selected ,checkbox checked and return request button to be enabled and dialog to be visible', async () => {
    const { user } = setup()
    const kiboSelectBtn = screen.getByRole('button', { name: 'choose-a-response' })
    expect(kiboSelectBtn).toBeVisible()

    await user.click(kiboSelectBtn)

    const listOption = screen.getByRole('listbox')
    const listbox = within(listOption)
    const option = listbox.getByText('Defective')

    await user.click(option)

    const productChecklist = screen.getAllByRole('checkbox')

    expect(productChecklist[0]).toBeInTheDocument()
    await user.click(productChecklist[0])
    expect(productChecklist[0]).toBeChecked()

    const showConfirmReturnRequest = screen.getByRole('button', {
      name: /confirm-return-request/i,
    })
    expect(showConfirmReturnRequest).toBeEnabled()
    await user.click(showConfirmReturnRequest)

    const title = screen.getByText(/return-request-submitted/i)
    expect(title).toBeVisible()
  })
})
