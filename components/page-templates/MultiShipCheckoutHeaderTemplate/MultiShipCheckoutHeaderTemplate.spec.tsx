import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './MultiShipCheckoutHeaderTemplate.stories'

const { Common } = composeStories(stories)

jest.mock('../../layout/AppHeader/Checkout/CheckoutHeader/CheckoutHeader', () => ({
  __esModule: true,
  default: () => <div data-testid="checkout-header-mock" />,
}))

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValue(false),
}))

describe('[component] - Multiship checkout header template', () => {
  it('should render component', async () => {
    render(<Common {...Common?.args} />)
    const checkoutHeader = screen.getByTestId('checkout-header-mock')
    expect(checkoutHeader).toBeVisible()
  })
})
