import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/order/order-confirmation/OrderConfirmation.stories'
import { orderGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

const { Common } = composeStories(stories)

describe('[components] - OrderConfirmation Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', async () => {
    setup()

    const order = Common.args?.order as Order

    const orderNumber = orderGetters.getOrderNumber(order)
    const submittedDate = orderGetters.getSubmittedDate(order)
    const pickupItems = orderGetters.getPickupItems(order)
    const shipItems = orderGetters.getShipItems(order)
    const email = orderGetters.getEmail(order) as string

    expect(screen.getByText(/your-order/i)).toBeVisible()
    expect(screen.getByText(new RegExp(String(orderNumber)))).toBeVisible()
    expect(screen.getByText(/order-date/i)).toBeVisible()
    expect(screen.getByText(new RegExp(submittedDate))).toBeVisible()
    expect(screen.getByText(new RegExp(email))).toBeVisible()
    expect(screen.getByText(new RegExp(`item-quantity`))).toBeVisible()

    shipItems?.map((item) => {
      expect(screen.getByText(item?.product?.name || '')).toBeVisible()
    })
    pickupItems?.map((item) => {
      expect(screen.getByText(item?.product?.name || '')).toBeVisible()
    })

    expect(screen.getByText(/order-summary/i)).toBeVisible()
    expect(screen.getByText(/total-price/i)).toBeVisible()
    expect(screen.getByText(/shipping/i)).toBeVisible()
    expect(screen.getByText(/estimated-tax/i)).toBeVisible()
    expect(screen.getByText(/cart-total/i)).toBeVisible()

    expect(screen.getAllByText(/currency/i)).toHaveLength(9)
  })
})
