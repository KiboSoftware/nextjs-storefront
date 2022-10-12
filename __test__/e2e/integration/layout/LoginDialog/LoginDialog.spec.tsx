/* eslint-disable  testing-library/no-unnecessary-act */

import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/layout/Login/LoginDialog/LoginDialog.stories'
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

describe('[components] Login Dialog', () => {
  const setup = () => {
    const user = userEvent.setup()
    renderComponent()

    return {
      user,
    }
  }

  it('should render component', () => {
    setup()
    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const eyeIcon = screen.getByRole('button', { name: 'toggle icon visibility' })
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: 'remember-me' })
    const loginButton = screen.getByRole('button', { name: 'log-in' })
    const forgotPasswordLink = screen.getByRole('button', { name: 'forgot-password' })
    const registerNowLink = screen.getByRole('button', { name: 'register-now' })

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(eyeIcon).toBeVisible()
    expect(rememberMeCheckbox).toBeInTheDocument()
    expect(loginButton).toBeVisible()
    expect(loginButton).toBeDisabled()
    expect(forgotPasswordLink).toBeVisible()
    expect(registerNowLink).toBeVisible()
  })

  it('should unmusk password when click on eye icon', async () => {
    const { user } = setup()

    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })

    const eyeIcon = screen.getByRole('button', { name: 'toggle icon visibility' })
    const passwordInput = screen.getByLabelText('password')

    expect(closeIconButton).toBeInTheDocument()
    expect(closeIconButton).toBeVisible()
    expect(passwordInput).toHaveAttribute('type', 'password')

    await act(async () => {
      await user.click(eyeIcon)
    })

    await waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'))
  })

  it("should display 'This field is required' error when user focus out (blur event) the Email field", async () => {
    const { user } = setup()

    let emailError = screen.queryByText(/this\-field\-is\-required/i)
    expect(emailError).not.toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: 'email' })

    await act(async () => {
      await user.clear(emailInput)
      fireEvent.blur(emailInput, { target: { value: '' } })
    })

    emailError = screen.getByText(/this\-field\-is\-required/i)
    expect(emailError).toBeVisible()
  })

  it("should display 'Email must be a valid email' error when user enters invalid email", async () => {
    const { user } = setup()

    let emailError = screen.queryByText(/email\-must\-be\-a\-valid\-email/i)
    expect(emailError).not.toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: 'email' })

    await act(async () => {
      await user.clear(emailInput)
      await user.type(emailInput, 'xyz@ds')
    })

    emailError = screen.getByText(/email\-must\-be\-a\-valid\-email/i)
    expect(emailError).toBeVisible()
  })

  it("should display 'This field is required' error when user focus out (blur event) the Password field", async () => {
    const { user } = setup()

    const loginFormPasswordError = screen.queryByText(/this field is required/i)
    expect(loginFormPasswordError).not.toBeInTheDocument()

    const loginFormPasswordInput = screen.getByLabelText('password')
    await act(async () => {
      await user.clear(loginFormPasswordInput)
      fireEvent.blur(loginFormPasswordInput, { target: { value: '' } })
    })

    const loginPasswordError = screen.getAllByText(/this-field-is-required/i)
    expect(loginPasswordError[0]).toBeVisible()
  })
})
