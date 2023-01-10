import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './SubscriptionItem.stories' // import all stories from the stories file
import { subscriptionItemMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import { DialogRoot, ModalContextProvider } from '@/context'
import { subscriptionGetters } from '@/lib/getters'

const { Common } = composeStories(stories)
const subscriptionItem = subscriptionItemMock?.items

const orderSubscriptionNowMock = jest.fn()
const skipNextSubscriptionMock = jest.fn()

jest.mock(
  '@/hooks/mutations/useSubscription/useOrderSubscriptionNow/useOrderSubscriptionNowMutation',
  () => ({
    useOrderSubscriptionNowMutation: jest.fn(() => ({
      orderSubscriptionNow: {
        mutateAsync: orderSubscriptionNowMock,
      },
    })),
  })
)

jest.mock(
  '@/hooks/mutations/useSubscription/useSkipNextSubscription/useSkipNextSubscriptionMutation',
  () => ({
    useSkipNextSubscriptionMutation: jest.fn(() => ({
      skipNextSubscription: {
        mutateAsync: skipNextSubscriptionMock,
      },
    })),
  })
)

describe('[component] - SubscriptionItem', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(
      <>
        <ModalContextProvider>
          <DialogRoot />
          <Common />
        </ModalContextProvider>
      </>,
      {
        wrapper: createQueryClientWrapper(),
      }
    )
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

    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'edit-subscription-frequency'
    )
  })

  it('should render Confirmation Dialog if clicked on ship-an-item-now button', async () => {
    const { user } = setup()
    const shipAnItemNowButton = screen.getByRole('button', { name: 'ship-an-item-now' })

    await user.click(shipAnItemNowButton)

    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByText('place-an-order-of-this-subscription-now')).toBeVisible()

    const confirmOrderButton = screen.getByRole('button', { name: 'confirm' })

    await user.click(confirmOrderButton)

    expect(orderSubscriptionNowMock).toHaveBeenCalled()
  })

  it('should render Confirmation Dialog if clicked on skip-shipment button', async () => {
    const { user } = setup()
    const skipShipmentButton = screen.getByRole('button', { name: 'skip-shipment' })

    await user.click(skipShipmentButton)

    expect(screen.getByRole('dialog')).toBeVisible()
    expect(screen.getByText('skip-next-subscription-confirmation')).toBeVisible()

    const confirmButton = screen.getByRole('button', { name: 'yes' })

    await user.click(confirmButton)

    expect(skipNextSubscriptionMock).toHaveBeenCalled()
  })
})
