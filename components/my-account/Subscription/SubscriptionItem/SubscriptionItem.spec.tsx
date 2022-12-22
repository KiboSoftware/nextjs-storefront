import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './SubscriptionItem.stories' // import all stories from the stories file
<<<<<<< HEAD
import { subscriptionItemMock } from '@/__mocks__/stories/subscriptionCollectionMock'
import { subscriptionGetters } from '@/lib/getters'

=======
<<<<<<<< HEAD:components/my-account/Subscription/MySubscription/MySubscription.spec.tsx
import { subscriptionItemMock } from '@/__mocks__/stories/subscriptionCollectionMock'
import { subscriptionGetters } from '@/lib/getters'

========
>>>>>>>> f37e0806 (Resolved PR Comments and fixed failing test case):components/my-account/Subscription/SubscriptionItem/SubscriptionItem.spec.tsx
>>>>>>> f37e0806 (Resolved PR Comments and fixed failing test case)
const { Common } = composeStories(stories)
const subscriptionItem = subscriptionItemMock?.items

const showModalMock = jest.fn()
jest.mock('@/context/ModalContext', () => ({
  useModalContext: () => ({
    showModal: showModalMock,
  }),
}))

describe('[component] - Subscription', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common />)
    return {
      user,
    }
  }

  it('should render component', () => {
    setup()
    const subscriptionNumber = screen.getByText(/subscription-number/i)
    const status = screen.getByText(/status/i)
    const shipmentFrequency = screen.getByText(/shipment-frequency/i)
    const nextArrivalDate = screen.getByText(/estimated-next-arrival-date/i)
    const shipItemNowButton = screen.getByRole('button', {
      name: /ship-an-item-now/i,
    })
    const skipShipmentButton = screen.getByRole('button', {
      name: /skip-shipment/i,
    })
    const editFrequencyButton = screen.getByRole('button', {
      name: /edit-frequency/i,
    })
    const editOrderDateButton = screen.getByRole('button', {
      name: /edit-order-date/i,
    })
    const cancelAnItemButton = screen.getByRole('button', {
      name: /cancel-an-item/i,
    })
    const editBillingInformationButton = screen.getByRole('button', {
      name: /edit-billing-information/i,
    })
    const editShippingAddressButton = screen.getByRole('button', {
      name: /edit-shipping-address/i,
    })
    const pauseSubscriptionButton = screen.getByRole('button', {
      name: /pause-subscription/i,
    })

    expect(
      screen.getByText(subscriptionGetters.getSubscriberName(subscriptionItem))
    ).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriberAddress(subscriptionItem))
    ).toBeInTheDocument()
    expect(subscriptionNumber).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(status).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(shipmentFrequency).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(nextArrivalDate).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(skipShipmentButton).toBeVisible()
    expect(shipItemNowButton).toBeVisible()
    expect(editFrequencyButton).toBeVisible()
    expect(editOrderDateButton).toBeVisible()
    expect(cancelAnItemButton).toBeVisible()
    expect(editBillingInformationButton).toBeVisible()
    expect(editShippingAddressButton).toBeVisible()
    expect(pauseSubscriptionButton).toBeVisible()
  })

  it('should open Edit Subscription Frequency Dialog when user clicks on Edit Frequency button', async () => {
    setup()

    const editFrequencyButton = screen.getByRole('button', {
      name: /edit-frequency/i,
    })

    await userEvent.click(editFrequencyButton)

    expect(showModalMock).toHaveBeenCalledTimes(1)
  })
})
