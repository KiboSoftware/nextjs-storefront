import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ShippingStep.stories'

const { Common } = composeStories(stories)

describe('[components] ShippingStep', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const ShippingComponent = screen.getByText(/Shipping/i)

    expect(ShippingComponent).toBeVisible()
  })

  it('should stepperStatus validate', () => {
    setup()
    const stepperStatus = 'VALIDATE'

    expect(stepperStatus).toBe('VALIDATE')
  })
})
