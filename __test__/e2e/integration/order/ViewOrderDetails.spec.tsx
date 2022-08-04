import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/order/view-order-details/ViewOrderDetails.stories'
import { FulfillmentOptions } from '@/lib/constants'
import { orderGetters } from '@/lib/getters'

import type { Order, PaymentCard } from '@/lib/gql/types'

const { Common } = composeStories(stories)

describe('[components] - ViewOrderDetails Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', async () => {
    setup()

    const order = Common.args?.order as Order
    const shipItems =
      Common.args?.order?.items?.filter(
        (item) => item?.fulfillmentMethod === FulfillmentOptions.SHIP
      ) || []
    const pickupItems =
      Common.args?.order?.items?.filter(
        (item) => item?.fulfillmentMethod === FulfillmentOptions.PICKUP
      ) || []
    const payments = Common.args?.order?.payments || []

    expect(screen.getByText(/order-number/i)).toBeVisible()
    expect(screen.getByText(/order-date/i)).toBeVisible()
    expect(screen.getByText(/order-total/i)).toBeVisible()
    expect(screen.getByText(`${Common.args?.order?.orderNumber}`)).toBeVisible()
    expect(screen.getByText(orderGetters.getSubmittedDate(order))).toBeVisible()

    shipItems?.map((item) => {
      expect(screen.getByText(item?.product?.name || '')).toBeVisible()
    })
    pickupItems?.map((item) => {
      expect(screen.getByText(item?.product?.name || '')).toBeVisible()
    })

    payments?.map((payment) => {
      const cardNumberPartOrMask = orderGetters.getOrderPaymentCardDetails(
        payment?.billingInfo?.card as PaymentCard
      ).cardNumberPartOrMask
      const expireMonth = orderGetters.getCardExpireMonth(payment?.billingInfo?.card as PaymentCard)
      const expireYear = orderGetters.getCardExpireYear(payment?.billingInfo?.card as PaymentCard)
      expect(screen.getByText(/Ending/i)).toBeVisible()
      expect(screen.getByText(/Exp/i)).toBeVisible()
      expect(screen.getByText(cardNumberPartOrMask)).toBeVisible()
      expect(screen.getByText(`${expireMonth}/${expireYear}`)).toBeVisible()
    })

    expect(screen.getAllByText('currency')).toHaveLength(7)
    expect(screen.getByText(/order-summary/i)).toBeVisible()
    expect(screen.getByText(/total-price/i)).toBeVisible()
    expect(screen.getByText(/shipping/i)).toBeVisible()
    expect(screen.getByText(/estimated-tax/i)).toBeVisible()
  })
})
