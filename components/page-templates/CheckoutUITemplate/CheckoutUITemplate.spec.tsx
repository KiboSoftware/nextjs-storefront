import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CheckoutUITemplate.stories'

const { Common } = composeStories(stories)

jest.mock('../../common/OrderSummary/OrderSummary', () => ({
  __esModule: true,
  default: () => <div data-testid="order-summary-mock" />,
}))
jest.mock('../../order/OrderConfirmation/OrderConfirmation', () => ({
  __esModule: true,
  default: () => <div data-testid="order-confirmation-mock" />,
}))
jest.mock('../../checkout/OrderReview/OrderReview', () => ({
  __esModule: true,
  default: () => <div data-testid="order-review-mock" />,
}))

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

describe('[component] - CheckoutUITemplate', () => {
  it('should render component', async () => {
    render(<Common {...Common?.args} />)
    const orderSummary = screen.getByTestId('order-summary-mock')
    const OrderConfirmation = screen.getByTestId('order-confirmation-mock')
    const OrderReview = screen.getByTestId('order-review-mock')

    expect(orderSummary).toBeVisible()
    expect(OrderConfirmation).toBeVisible()
    expect(OrderReview).toBeVisible()
  })
})
