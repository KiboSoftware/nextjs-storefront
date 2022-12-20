/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MySubscription.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

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

    expect(subscriptionNumber).toBeInTheDocument()
    expect(status).toBeInTheDocument()
    expect(shipmentFrequency).toBeInTheDocument()
    expect(nextArrivalDate).toBeInTheDocument()
    expect(skipShipmentButton).toBeVisible()
    expect(shipItemNowButton).toBeVisible()
    expect(editFrequencyButton).toBeVisible()
    expect(editOrderDateButton).toBeVisible()
    expect(cancelAnItemButton).toBeVisible()
    expect(editBillingInformationButton).toBeVisible()
    expect(editShippingAddressButton).toBeVisible()
    expect(pauseSubscriptionButton).toBeVisible()
  })
})
