import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Shipping.stories'

const { Common } = composeStories(stories)

describe('[components] Shipping', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const ShippingComponent = screen.getByText(/Shipping/i)

    expect(ShippingComponent).toBeVisible()
  })
})
