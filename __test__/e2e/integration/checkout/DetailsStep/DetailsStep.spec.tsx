/* eslint-disable  testing-library/no-unnecessary-act */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/checkout/DetailsStep/DetailsStep.stories'

const { Common } = composeStories(stories)

describe('[components] Details', () => {
  const setup = (args = Common.args) => {
    render(<Common {...args} />)
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

    const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })

    const firstNameLabel = screen.queryByText(/last-name/i)
    const firstNameInput = screen.queryByRole('textbox', { name: /first-name/i })
    const lastNameLabel = screen.queryByText(/last-name/i)
    const lastNameInput = screen.queryByRole('textbox', { name: /last-name/i })
    const passwordLabel = screen.queryByText(/password/i)
    const passwordInput = screen.queryByRole('textbox', { name: /password/i })

    expect(signInButton).toBeVisible()
    expect(orFillTheDetailsText).toBeVisible()
    expect(emailTitle).toBeVisible()
    expect(emailInput).toBeVisible()
    expect(enjoyPerksText).toBeVisible()
    expect(fasterCheckoutText).toBeVisible()
    expect(earnCreditsText).toBeVisible()
    expect(fullRewardsText).toBeVisible()
    expect(manageYourWishList).toBeVisible()

    expect(iWantToCreateAccount).toBeInTheDocument()

    expect(firstNameLabel).not.toBeInTheDocument()
    expect(firstNameInput).not.toBeInTheDocument()
    expect(lastNameLabel).not.toBeInTheDocument()
    expect(lastNameInput).not.toBeInTheDocument()
    expect(passwordLabel).not.toBeInTheDocument()
    expect(passwordInput).not.toBeInTheDocument()
  })

  it('should render firstName, lastName and password when user selects "I want to create account"', async () => {
    setup()

    let firstNameLabel = screen.queryByText(/first-name/i)
    let firstNameInput = screen.queryByRole('textbox', { name: /first-name/i })
    let lastNameLabel = screen.queryByText(/last-name/i)
    let lastNameInput = screen.queryByRole('textbox', { name: /last-name/i })
    const passwordLabel = screen.queryByText(/password/i)
    let passwordInput = screen.queryByRole('textbox', { name: /password/i })

    expect(firstNameLabel).not.toBeInTheDocument()
    expect(firstNameInput).not.toBeInTheDocument()
    expect(lastNameLabel).not.toBeInTheDocument()
    expect(lastNameInput).not.toBeInTheDocument()
    expect(passwordLabel).not.toBeInTheDocument()
    expect(passwordInput).not.toBeInTheDocument()

    const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })
    await act(async () => {
      userEvent.click(iWantToCreateAccount)
    })

    firstNameLabel = screen.getByText(/first-name/i)
    firstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    lastNameLabel = screen.getByText(/last-name/i)
    lastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    passwordInput = screen.getByPlaceholderText('password')

    expect(firstNameLabel).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(lastNameLabel).toBeVisible()
    expect(lastNameInput).toBeVisible()
    expect(passwordInput).toBeVisible()
  })

  it('email should display required field error when user focus out (blur event) the email field', async () => {
    setup()

    let emailError = screen.queryByText(/this field is required/i)
    expect(emailError).not.toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: /your-email/i })

    await act(async () => {
      emailInput.focus()
      fireEvent.blur(emailInput, { target: { value: '' } })
    })

    emailError = screen.getByText(/this-field-is-required/i)
    expect(emailError).toBeVisible()
  })

  it('first name should display required field error when user focus out (blur event) the first name field', async () => {
    setup()

    let firstNameError = screen.queryByText(/this field is required/i)
    expect(firstNameError).not.toBeInTheDocument()

    const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })
    await act(async () => {
      userEvent.click(iWantToCreateAccount)
    })

    const firstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    await act(async () => {
      firstNameInput.focus()
      fireEvent.blur(firstNameInput, { target: { value: '' } })
    })

    firstNameError = screen.queryByText(/this-field-is-required/i)
    expect(firstNameError).toBeVisible()
  })

  it('last name should display required field error when user focus out (blur event) the last name field', async () => {
    setup()

    let lastNameError = screen.queryByText(/this field is required/i)
    expect(lastNameError).not.toBeInTheDocument()

    const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })
    await act(async () => {
      userEvent.click(iWantToCreateAccount)
    })

    const lastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    await act(async () => {
      lastNameInput.focus()
      fireEvent.blur(lastNameInput, { target: { value: '' } })
    })

    lastNameError = screen.queryByText(/this-field-is-required/i)
    expect(lastNameError).toBeVisible()
  })

  it('password should display required field error when user focus out (blur event) the password field', async () => {
    setup()

    let passwordError = screen.queryByText(/this field is required/i)
    expect(passwordError).not.toBeInTheDocument()

    const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })
    await act(async () => {
      userEvent.click(iWantToCreateAccount)
    })

    const passwordInput = screen.getByPlaceholderText('password')
    await act(async () => {
      passwordInput.focus()
      fireEvent.blur(passwordInput, { target: { value: '' } })
    })

    passwordError = screen.queryByText(/this-field-is-required/i)
    expect(passwordError).toBeVisible()
  })
})
