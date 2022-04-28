import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PaymentCardDetailsView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

describe('[component] - PaymentCardDetailsView', () => {
  it('should render header', () => {
    render(<Common {...Common.args} />)
    const heading = screen.getByRole('heading', {
      name: /Payment Method/i,
    })

    expect(heading).toBeVisible()
  })

  it('should render card details', () => {
    render(<Common {...Common.args} />)
    const endingLabel = screen.getByText(/ending/i)
    const endingValue = screen.getByText(/1234/i)
    const expLabel = screen.getByText(/exp/i)
    const expValue = screen.getByText(/4\/2026/i)

    expect(endingLabel).toBeVisible()
    expect(endingValue).toBeVisible()
    expect(expLabel).toBeVisible()
    expect(expValue).toBeVisible()
  })

  it('should render as radio button if radio prop is true', () => {
    render(<Radio {...Radio.args} />)

    expect(
      screen.getByRole('radio', {
        name: 'visa ending 1234 exp 4/2026',
      })
    ).toBeInTheDocument()
  })
})
