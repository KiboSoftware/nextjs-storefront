/* eslint-disable  testing-library/no-unnecessary-act */

import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import * as stories from '@/components/layout/RegisterAccount/RegisterAccountDialog/RegisterAccountDialog.stories'
import { AuthContext } from '@/context'

const { Common } = composeStories(stories)

const userContextValues = {
  isAuthenticated: false,
  login: jest.fn(),
  createAccount: jest.fn(),
  setAuthError: jest.fn(),
  authError: '',
  logout: jest.fn(),
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider value={userContextValues}>{children}</AuthContext.Provider>
)

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper })
}

describe('[components] Register Account Dialog', () => {
  const setup = () => renderComponent()

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

    const createAccountButton = screen.getByRole('button', { name: /create-an-account/i })

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
  it('Should display required message onBlur of create Account inputs', async () => {
    // arrange
    setup()
    const emptyInput = { target: { value: '' } }

    const allInputs = screen.getAllByRole('textbox')
    const passwordInput = screen.getByLabelText(/password/i)
    allInputs.push(passwordInput)
    await act(async () => {
      allInputs.forEach((input) => {
        input.focus()
        fireEvent.blur(input, emptyInput)
      })
    })

    const validationMessage = screen.getAllByText(/this-field-is-required/i)
    expect(validationMessage).toHaveLength(4)
  })
})
