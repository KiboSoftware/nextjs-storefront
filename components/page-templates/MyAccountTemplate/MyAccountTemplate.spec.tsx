import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MyAccountTemplate.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

describe('[component] - Category', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common />)
    return {
      user,
    }
  }

  it('should render component', async () => {
    const { user } = setup()

    const myAccount = screen.getByText(/common:my-account/i)
    const myProfile = screen.getByText(/common:my-profile/i)
    const shippingAddress = screen.getByText(/shipping-address/i)
    const paymentMethod = screen.getByText(/payment-method/i)
    const orderDetails = screen.getByText(/order-details/i)
    const orderHistory = screen.getByText(/common:order-history/i)
    const logout = screen.getByText(/common:logout/i)

    expect(myAccount).toBeInTheDocument()
    expect(myProfile).toBeInTheDocument()
    expect(shippingAddress).toBeInTheDocument()
    expect(paymentMethod).toBeInTheDocument()
    expect(orderDetails).toBeInTheDocument()
    expect(orderHistory).toBeInTheDocument()
    expect(logout).toBeInTheDocument()
  })
})
