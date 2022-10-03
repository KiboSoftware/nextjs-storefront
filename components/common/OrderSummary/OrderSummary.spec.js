/** @format */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderSummary.stories' // import all stories from the stories file

const { Checkout } = composeStories(stories)

const orderPriceMock = () => <div data-testid="order-price-component" />
jest.mock('@/components/common/OrderPrice/OrderPrice', () => () => orderPriceMock())

describe('checkout Component', () => {
  it('should render order summary heading', () => {
    render(<Checkout {...Checkout.args} />)
    const orderSummaryHeading = screen.getByText(Checkout.args.nameLabel)
    const orderPriceComponent = screen.getByTestId('order-price-component')
    expect(orderSummaryHeading).toBeVisible()
    expect(orderPriceComponent).toBeInTheDocument()
  })
})
