import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/my-account/Subscription/SubscriptionList/SubscriptionList.stories' // import all stories from the stories file
import { DialogRoot, ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  const mockOnAccountTitleClick = jest.fn()

  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <Common {...Common.args} onAccountTitleClick={mockOnAccountTitleClick} />
    </ModalContextProvider>
  )

  return {
    user,
    mockOnAccountTitleClick,
  }
}

describe('[component] - SubscriptionList integration', () => {
  it('should go back to my account page on clicking on back arrow icon from mySubscription Page', async () => {
    const { user, mockOnAccountTitleClick } = setup()
    const applyButton = screen.getByTestId(/ArrowBackIosIcon/i)
    await user.click(applyButton)
    expect(mockOnAccountTitleClick).toBeCalled()
    expect(screen.getByText(/my-account/i)).toBeVisible()
  })

  it('should open confirmation dialog on skip shipment button click', async () => {
    const { user } = setup()

    const skipShipmentButton = screen.getAllByRole('button', {
      name: /skip-shipment/i,
    })

    await user.click(skipShipmentButton[0])

    const confirmationText = screen.getByText(/skip-next-subscription-confirmation/i)
    expect(confirmationText).toBeVisible()
    expect(screen.getByRole('button', { name: 'close' })).toBeVisible()
  })
})
