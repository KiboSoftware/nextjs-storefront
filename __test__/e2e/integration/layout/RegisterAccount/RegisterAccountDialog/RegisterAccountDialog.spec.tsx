/* eslint-disable  testing-library/no-unnecessary-act */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import * as stories from '@/components/layout/RegisterAccount/RegisterAccountDialog/RegisterAccountDialog.stories'

const { Common } = composeStories(stories)

describe('[components] Register Account Dialog', () => {
  const onDialogCloseMock = jest.fn()
  const setup = (args = Common.args) => {
    render(<Common {...args} setAutoFocus={false} onDialogClose={onDialogCloseMock} />)
    return { onDialogCloseMock }
  }

  it('should render component', () => {
    setup()
    const registerAccountFormEmailLabel = screen.getByText(/email/i)
    const registerAccountFormEmailInput = screen.getByRole('textbox', { name: /email/i })

    const registerAccountFormFirstNameLabel = screen.queryByText(/first-name/i)
    const registerAccountFormFirstNameInput = screen.queryByRole('textbox', { name: /first-name/i })
    const registerAccountFormLastNameLabel = screen.queryByText(/last-name/i)
    const registerAccountFormLastNameInput = screen.queryByRole('textbox', { name: /last-name/i })
    const registerAccountFormPasswordLabel = screen.queryByText(/password/i)
    const registerAccountFormPasswordInput = screen.getByLabelText(/password/i)

    const createAccountButton = screen.getByRole('button', { name: /common:create-an-account/i })

    expect(registerAccountFormEmailLabel).toBeVisible()
    expect(registerAccountFormEmailInput).toBeVisible()

    expect(registerAccountFormFirstNameLabel).toBeInTheDocument()
    expect(registerAccountFormFirstNameInput).toBeInTheDocument()

    expect(registerAccountFormLastNameLabel).toBeInTheDocument()
    expect(registerAccountFormLastNameInput).toBeInTheDocument()

    expect(registerAccountFormPasswordLabel).toBeInTheDocument()
    expect(registerAccountFormPasswordInput).toBeInTheDocument()

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

    const registerAccountFormFirstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    await act(async () => {
      registerAccountFormFirstNameInput.focus()
      fireEvent.blur(registerAccountFormFirstNameInput, { target: { value: '' } })
    })

    firstNameError = screen.queryByText(/this-field-is-required/i)
    expect(firstNameError).toBeVisible()
  })

  it('last name should display required field error when user focus out (blur event) the last name field', async () => {
    setup()

    let lastNameError = screen.queryByText(/this field is required/i)
    expect(lastNameError).not.toBeInTheDocument()

    const registerAccountFormLastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    await act(async () => {
      registerAccountFormLastNameInput.focus()
      fireEvent.blur(registerAccountFormLastNameInput, { target: { value: '' } })
    })

    lastNameError = screen.queryByText(/this-field-is-required/i)
    expect(lastNameError).toBeVisible()
  })

  it('password should display required field error when user focus out (blur event) the password field', async () => {
    setup()

    let RegisterAccountFormPasswordError = screen.queryByText(/this field is required/i)
    expect(RegisterAccountFormPasswordError).not.toBeInTheDocument()

    const registerAccountFormPasswordInput = screen.getByLabelText(/password/i)
    await act(async () => {
      registerAccountFormPasswordInput.focus()
      fireEvent.blur(registerAccountFormPasswordInput, { target: { value: '' } })
    })

    RegisterAccountFormPasswordError = screen.queryByText(/this-field-is-required/i)
    expect(RegisterAccountFormPasswordError).toBeVisible()
  })
})
