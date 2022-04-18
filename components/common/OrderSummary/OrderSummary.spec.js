/** @format */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

// import theme from '../../../styles/theme'
import * as stories from './Order.stories' // import all stories from the stories file

const { Checkout, Shipping } = composeStories(stories)

describe('checkout Component', () => {
  it('should render checkout text', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.name)
    expect(checkout).toBeVisible()
  })

  it('should render checkout cartTotal', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.cartTotal)
    expect(checkout).toBeVisible()
  })

  it('should render checkout standardShippingAmount', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.standardShippingAmount)
    expect(checkout).toBeVisible()
  })

  it('should render checkout estTaxamt', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.estTaxamt)
    expect(checkout).toBeVisible()
  })

  it('should render checkout estTax', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.estTax)
    expect(checkout).toBeVisible()
  })

  it('should render checkout orderTotal', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.orderTotal)
    expect(checkout).toBeVisible()
  })

  it('should render checkout subTotal', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.essubTotaltTax)
    expect(checkout).toBeVisible()
  })

  it('should render checkout estOrderTotal', () => {
    render(<Checkout {...Checkout.args} />)
    const checkout = screen.getByText(Checkout.args.estOrderTotal)
    expect(checkout).toBeVisible()
  })
})
