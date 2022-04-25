import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Payment.stories'

const { Common } = composeStories(stories)

describe('[components] Payment', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const paymentComponent = screen.getByText(/payment/i)

    expect(paymentComponent).toBeVisible()
  })
})
