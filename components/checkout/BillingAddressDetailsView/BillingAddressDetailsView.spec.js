import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './BillingAddressDetailsView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

describe('[component] - BillingAddressDetailsView', () => {
  it('should render header', () => {
    render(<Common {...Common.args} />)
    const heading = screen.getByRole('heading', {
      name: /Billing Address/i,
    })

    expect(heading).toBeVisible()
  })

  it('should render address details', () => {
    render(<Common {...Common.args} />)
    const streetAddress = screen.getByText(/1234, my address/i)
    const apartment = screen.getByText(/1104/i)
    const city = screen.getByText(/austin/i)
    const state = screen.getByText(/texas/i)
    const zip = screen.getByText(/78727/i)

    expect(streetAddress).toBeVisible()
    expect(apartment).toBeVisible()
    expect(city).toBeVisible()
    expect(state).toBeVisible()
    expect(zip).toBeVisible()
  })

  it('should render as radio button if radio prop is true', () => {
    render(<Radio {...Radio.args} />)

    expect(
      screen.getByRole('radio', {
        name: '1234, My Address apartment1104 Austin Texas 78727',
      })
    ).toBeInTheDocument()
  })
})
