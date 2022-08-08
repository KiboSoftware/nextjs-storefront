/* eslint-disable  testing-library/no-unnecessary-act */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/checkout/DetailsStep/DetailsStep.stories'

const { Common } = composeStories(stories)

describe('[components] Details', () => {
  const setup = (args = Common.args) => {
    const user = userEvent.setup()
    render(<Common {...args} />)
    return {
      user,
    }
  }

  it('should render component', () => {
    setup()

    const signInButton = screen.getByRole('button', { name: /sign-into-your-account/i })
    const orFillTheDetailsText = screen.getByText(/or-fill-the-details-below/i)

    const emailTitle = screen.getByText(/your-email/i)
    const emailInput = screen.getByRole('textbox', { name: /your-email/i })

    const enjoyPerksText = screen.getByText(/enjoy-these-perks-with-your-free-account/i)
    const fasterCheckoutText = screen.getByText(/faster-checkout/i)
    const earnCreditsText = screen.getByText(/earn-credits-with-every-purchase/i)
    const fullRewardsText = screen.getByText(/full-rewards-program-benifits/i)
    const manageYourWishList = screen.getByText(/manage-your-wishlist/i)

    expect(signInButton).toBeVisible()
    expect(orFillTheDetailsText).toBeVisible()
    expect(emailTitle).toBeVisible()
    expect(emailInput).toBeVisible()
    expect(enjoyPerksText).toBeVisible()
    expect(fasterCheckoutText).toBeVisible()
    expect(earnCreditsText).toBeVisible()
    expect(fullRewardsText).toBeVisible()
    expect(manageYourWishList).toBeVisible()
  })

  it('email should display required field error when user focus out (blur event) the email field', async () => {
    setup()

    let emailError = screen.queryByText(/this\-field\-is\-required/i)
    expect(emailError).not.toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: /your-email/i })

    await act(async () => {
      emailInput.focus()
      fireEvent.blur(emailInput, { target: { value: '' } })
    })

    emailError = screen.getByText(/this\-field\-is\-required/i)
    expect(emailError).toBeVisible()
  })
})
