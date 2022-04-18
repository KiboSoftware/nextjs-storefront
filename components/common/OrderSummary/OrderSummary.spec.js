/** @format */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

// import theme from '../../../styles/theme'
import * as stories from './OrderSummary.stories' // import all stories from the stories file

const { Checkout, Shipping } = composeStories(stories)

describe('checkout Component', () => {
  it('should render checkout standardShippingAmount', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.standardShippingAmount)
    expect(checkout).toBeVisible()
  })

  it('should render checkout estimatedTaxAmout', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.estimatedTaxAmout)
    expect(checkout).toBeVisible()
  })

  it('should render checkout orderTotal', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.orderTotal)
    expect(checkout).toBeVisible()
  })

  it('should render checkout subTotal', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.subTotal)
    expect(checkout).toBeVisible()
  })

  it('should render shipping button', () => {
    render(<Shipping {...Shipping.args} />)
    const shipping = screen.getByText('Go to Shipping')
    expect(shipping).toBeVisible()
  })
})

