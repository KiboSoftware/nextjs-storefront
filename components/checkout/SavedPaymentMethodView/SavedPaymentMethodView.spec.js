import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './SavedPaymentMethodView.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - SavedPaymentMethodView', () => {
  it('should render header', () => {
    render(<Common {...Common.args} />)
    const heading = screen.getByRole('heading', {
      name: /payment-information/i,
    })

    expect(heading).toBeVisible()
  })

  it('should render Payment Details component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId(/payment-card-details-view/)).toBeVisible()
  })
})
