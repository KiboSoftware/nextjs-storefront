/* eslint-disable  testing-library/no-unnecessary-act */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import * as stories from '@/components/layout/RegisterAccount/RegisterAccountDialog/RegisterAccountDialog.stories'

const { Common } = composeStories(stories)

describe('[components] Register Account Dialog', () => {
  const setup = (args = Common.args) => {
    render(<Common {...args} />)
  }

  it('should render component', () => {
    setup()
    const RegisterAccountFormEmailLabel = screen.getByText(/email/i)
    const RegisterAccountFormEmailInput = screen.getByRole('textbox', { name: /email/i })

    const RegisterAccountFormFirstNameLabel = screen.queryByText(/first-name/i)
    const RegisterAccountFormFirstNameInput = screen.queryByRole('textbox', { name: /first-name/i })
    const RegisterAccountFormLastNameLabel = screen.queryByText(/last-name/i)
    const RegisterAccountFormLastNameInput = screen.queryByRole('textbox', { name: /last-name/i })
    const RegisterAccountFormPasswordLabel = screen.queryByText(/password/i)
    const RegisterAccountFormPasswordInput = screen.queryByRole('button', {
      name: /toggle password visibility/i,
    })

    const createAccountButton = screen.getByRole('button', { name: /common:create-an-account/i })

    expect(RegisterAccountFormEmailLabel).toBeVisible()
    expect(RegisterAccountFormEmailInput).toBeVisible()

    expect(RegisterAccountFormFirstNameLabel).toBeInTheDocument()
    expect(RegisterAccountFormFirstNameInput).toBeInTheDocument()

    expect(RegisterAccountFormLastNameLabel).toBeInTheDocument()
    expect(RegisterAccountFormLastNameInput).toBeInTheDocument()

    expect(RegisterAccountFormPasswordLabel).toBeInTheDocument()
    expect(RegisterAccountFormPasswordInput).toBeInTheDocument()

    expect(createAccountButton).toBeInTheDocument()
  })

  it('email should display required field error when user focus out (blur event) the email field', async () => {
    setup()

    let emailError = screen.queryByText(/this\-field\-is\-required/i)
    expect(emailError).not.toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: /email/i })

    await act(async () => {
      emailInput.focus()
      fireEvent.blur(emailInput, { target: { value: '' } })
    })

    emailError = screen.getByText(/this\-field\-is\-required/i)
    expect(emailError).toBeVisible()
  })

  it('first name should display required field error when user focus out (blur event) the first name field', async () => {
    setup()

    let firstNameError = screen.queryByText(/this field is required/i)
    expect(firstNameError).not.toBeInTheDocument()

    const RegisterAccountFormFirstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    await act(async () => {
      RegisterAccountFormFirstNameInput.focus()
      fireEvent.blur(RegisterAccountFormFirstNameInput, { target: { value: '' } })
    })

    firstNameError = screen.queryByText(/this-field-is-required/i)
    expect(firstNameError).toBeVisible()
  })

  it('last name should display required field error when user focus out (blur event) the last name field', async () => {
    setup()

    let lastNameError = screen.queryByText(/this field is required/i)
    expect(lastNameError).not.toBeInTheDocument()

    const RegisterAccountFormLastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    await act(async () => {
      RegisterAccountFormLastNameInput.focus()
      fireEvent.blur(RegisterAccountFormLastNameInput, { target: { value: '' } })
    })

    lastNameError = screen.queryByText(/this-field-is-required/i)
    expect(lastNameError).toBeVisible()
  })

  it('password should display required field error when user focus out (blur event) the password field', async () => {
    setup()

    let RegisterAccountFormPasswordError = screen.queryByText(/this field is required/i)
    expect(RegisterAccountFormPasswordError).not.toBeInTheDocument()

    const RegisterAccountFormPasswordInput = screen.getByRole('button', {
      name: /toggle password visibility/i,
    })
    await act(async () => {
      RegisterAccountFormPasswordInput.focus()
      fireEvent.blur(RegisterAccountFormPasswordInput, { target: { value: '' } })
    })

    RegisterAccountFormPasswordError = screen.queryByText(/this-field-is-required/i)
    expect(RegisterAccountFormPasswordError).toBeVisible()
  })
})
