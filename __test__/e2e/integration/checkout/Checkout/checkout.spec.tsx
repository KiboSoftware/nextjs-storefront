import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/checkout/Checkout/Checkout.stories'
import { renderWithQueryClient } from '../../../../../test-utils'

const { Common } = composeStories(stories)

describe('[components] Checkout integration', () => {
  const setup = () => {
    renderWithQueryClient(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const kiboStepper = screen.getByTestId('kibo-stepper')
    const details = screen.getByTestId('checkout-details')
    const shipping = screen.queryByTestId('checkout-shipping')

    const nextButton = screen.getByRole('button', { name: /go-to-shipping/i })
    const backButton = screen.getByRole('button', { name: /back/i })

    expect(kiboStepper).toBeVisible()
    expect(details).toBeVisible()
    expect(shipping).not.toBeInTheDocument()

    expect(nextButton).toBeVisible()
    expect(backButton).toBeVisible()
    expect(backButton).toBeDisabled()
  })

  it('should activate next step(shipping) when user enters valid input and clicks on "Go to Shipping" button', async () => {
    setup()

    const details: HTMLElement | null = screen.getByTestId('checkout-details')
    const emailInput = screen.getByRole('textbox', { name: /your-email/i })
    const shipping = screen.queryByTestId('checkout-shipping')

    expect(details).toBeVisible()
    expect(shipping).not.toBeInTheDocument()

    const nextButton = screen.getByRole('button', { name: /go-to-shipping/i })

    await act(async () => {
      userEvent.clear(emailInput)
      userEvent.type(emailInput, 'test@gmail.com')
      userEvent.click(nextButton)
    })

    expect(emailInput).toHaveValue('test@gmail.com')
  })
})
