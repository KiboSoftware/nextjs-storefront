import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/order/ViewOrderDetails/ViewOrderDetails.stories'
import { FulfillmentOptions } from '@/lib/constants'
import { cardGetters, orderGetters } from '@/lib/getters'

import type { CrOrder, CrPaymentCard } from '@/lib/gql/types'

const { Common } = composeStories(stories)

describe('[components] - ViewOrderDetails Integration', () => {
  const setup = (isOrderStatus: boolean) => {
    render(<Common {...Common.args} isOrderStatus={isOrderStatus} />)
  }

  it('should render component', async () => {
    setup(false)

    const order = Common.args?.order as CrOrder
    const shipItems =
      Common.args?.order?.items?.filter(
        (item) => item?.fulfillmentMethod === FulfillmentOptions.SHIP
      ) || []
    const pickupItems =
      Common.args?.order?.items?.filter(
        (item) => item?.fulfillmentMethod === FulfillmentOptions.PICKUP
      ) || []
    const payments = Common.args?.order?.payments || []

    expect(screen.getByText(/view-order-details/i)).toBeVisible()
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
      const cardNumberPartOrMask = cardGetters.getCardNumberPartOrMask(
        payment?.billingInfo?.card as CrPaymentCard
      )
      const expireMonth = cardGetters.getExpireMonth(payment?.billingInfo?.card as CrPaymentCard)
      const expireYear = cardGetters.getExpireYear(payment?.billingInfo?.card as CrPaymentCard)
      expect(screen.getByText(/Ending/i)).toBeVisible()
      expect(screen.getByText(/Exp/i)).toBeVisible()
      expect(screen.getByText(cardNumberPartOrMask)).toBeVisible()
      expect(screen.getByText(`${expireMonth}/${expireYear}`)).toBeVisible()
    })

    expect(screen.getAllByText('currency')).toHaveLength(8)
    expect(screen.getByText(/order-summary/i)).toBeVisible()
    expect(screen.getByText(/total-price/i)).toBeVisible()
    expect(screen.getByText(/shipping/i)).toBeVisible()
    expect(screen.getByText(/estimated-tax/i)).toBeVisible()
  })

  it('should render component for Order status', () => {
    setup(true)

    const order = Common.args?.order as CrOrder
    expect(screen.getByText(/order-number/i)).toBeVisible()
    expect(screen.getByText(/order-date/i)).toBeVisible()
    expect(screen.getByText(/shipped-to/i)).toBeVisible()
    expect(screen.getByText(`${Common.args?.order?.orderNumber}`)).toBeVisible()
    expect(screen.getByText(orderGetters.getSubmittedDate(order))).toBeVisible()
    expect(screen.getByText(orderGetters.getShippedTo(order))).toBeVisible()
    expect(screen.queryByText(/order-summary/i)).not.toBeInTheDocument()
    expect(screen.queryByText('payment-information')).not.toBeInTheDocument()
  })
})
