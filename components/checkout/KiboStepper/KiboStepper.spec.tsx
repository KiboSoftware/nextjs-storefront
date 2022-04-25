import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './KiboStepper.stories'

const { Common } = composeStories(stories)

describe('[components] KiboStepper', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const firstStepHeading = screen.getByRole('heading', { name: /details/i })
    const secondStepHeading = screen.getByRole('heading', { name: /shipping/i })
    const thirdStepHeading = screen.getByRole('heading', { name: /payment/i })
    const fourthStepHeading = screen.getByRole('heading', { name: /review/i })

    expect(firstStepHeading).toBeVisible()
    expect(secondStepHeading).toBeVisible()
    expect(thirdStepHeading).toBeVisible()
    expect(fourthStepHeading).toBeVisible()
  })
})
