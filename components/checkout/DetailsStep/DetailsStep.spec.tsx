/* eslint-disable  testing-library/no-unnecessary-act */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './DetailsStep.stories'

const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onChange={onChangMock} />
jest.mock('../../common/KiboTextBox/KiboTextBox', () => () => KiboTextBoxMock())

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
    const enjoyPerksText = screen.getByText(/enjoy-these-perks-with-your-free-account/i)
    const fasterCheckoutText = screen.getByText(/faster-checkout/i)
    const earnCreditsText = screen.getByText(/earn-credits-with-every-purchase/i)
    const fullRewardsText = screen.getByText(/full-rewards-program-benifits/i)
    const manageYourWishList = screen.getByText(/manage-your-wishlist/i)

    const emailInput = screen.getByTestId(/text-box-mock/i)

    expect(signInButton).toBeVisible()
    expect(orFillTheDetailsText).toBeVisible()
    expect(enjoyPerksText).toBeVisible()
    expect(fasterCheckoutText).toBeVisible()
    expect(earnCreditsText).toBeVisible()
    expect(fullRewardsText).toBeVisible()
    expect(manageYourWishList).toBeVisible()

    expect(emailInput).toBeVisible()
  })
})
