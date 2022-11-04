import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboStepper.stories'
import { CheckoutStepProvider } from '@/context'

const { Details } = composeStories(stories)

describe('[components] KiboStepper', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(
      <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
        <Details {...Details.args} />
      </CheckoutStepProvider>
    )
    return {
      user,
    }
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

  it('should go to the previous step', async () => {
    const { user } = setup()

    const firstStepHeading = screen.getByRole('heading', { name: /details/i })

    await user.click(firstStepHeading)

    const personalDatailsHeading = screen.getByText('Details step content goes here...')
    expect(personalDatailsHeading).toBeVisible()
  })
})
