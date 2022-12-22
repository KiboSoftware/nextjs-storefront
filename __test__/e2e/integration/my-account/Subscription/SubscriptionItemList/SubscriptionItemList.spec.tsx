import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/my-account/Subscription/SubscriptionItemList/SubscriptionItemList.stories' // import all stories from the stories file
import { DialogRoot, ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  renderWithQueryClient(
    <ModalContextProvider>
      <DialogRoot />
      <Common />
    </ModalContextProvider>
  )

  return {
    user,
  }
}

describe('[component] - SubscriptionItemList integration', () => {
  it('should open confirmation dialog on skip shipment button click', async () => {
    const { user } = setup()

    const skipShipmentButton = screen.getByRole('button', {
      name: /skip-shipment/i,
    })

    await user.click(skipShipmentButton)

    const confirmationText = screen.getByText(/skip-next-subscription-confirmation/i)
    expect(confirmationText).toBeVisible()
    expect(screen.getByRole('button', { name: 'close' })).toBeVisible()
  })
})
