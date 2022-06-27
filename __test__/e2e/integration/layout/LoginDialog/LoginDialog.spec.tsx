/* eslint-disable  testing-library/no-unnecessary-act */

import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/layout/Login/LoginDialog/LoginDialog.stories'
import { UIStateContext, UserContext } from '@/context'

const { Common } = composeStories(stories)
const uiContextValues = { isLoginDialogOpen: true, toggleLoginDialog: jest.fn() }
const userContextValues = {
  isAuthenticated: false,
  login: jest.fn(),
  setAuthError: jest.fn(),
  authError: '',
}

const wrapper = ({ children }: { children: ReactNode }) => (
  <UIStateContext.Provider value={uiContextValues}>
    <UserContext.Provider value={userContextValues}>{children}</UserContext.Provider>
  </UIStateContext.Provider>
)

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper })
}

describe('[components] Login Dialog', () => {
  const setup = () => renderComponent()

  it('should render component', () => {
    setup()
    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const eyeIcon = screen.getByRole('button', { name: 'toggle icon visibility' })
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: 'common:remember-me' })
    const loginButton = screen.getByRole('button', { name: 'common:log-in' })
    const forgotPasswordLink = screen.getByRole('button', { name: 'common:forgot-password' })
    const registerNowLink = screen.getByRole('button', { name: 'common:register-now' })

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
    setup()

    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })

    const eyeIcon = screen.getByRole('button', { name: 'toggle icon visibility' })
    const passwordInput = screen.getByLabelText('password')

    expect(closeIconButton).toBeInTheDocument()
    expect(closeIconButton).toBeVisible()
    expect(passwordInput).toHaveAttribute('type', 'password')

    await act(async () => {
      userEvent.click(eyeIcon)
    })

    await waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'))
  })

  it("should display 'This field is required' error when user focus out (blur event) the Email field", async () => {
    setup()

    let emailError = screen.queryByText(/this\-field\-is\-required/i)
    expect(emailError).not.toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: 'email' })

    await act(async () => {
      userEvent.clear(emailInput)
      fireEvent.blur(emailInput, { target: { value: '' } })
    })

    emailError = screen.getByText(/this\-field\-is\-required/i)
    expect(emailError).toBeVisible()
  })

  it("should display 'Email must be a valid email' error when user enters invalid email", async () => {
    setup()

    let emailError = screen.queryByText(/email\-must\-be\-a\-valid\-email/i)
    expect(emailError).not.toBeInTheDocument()

    const emailInput = screen.getByRole('textbox', { name: 'email' })

    await act(async () => {
      userEvent.clear(emailInput)
      userEvent.type(emailInput, 'xyz@ds')
    })

    emailError = screen.getByText(/email\-must\-be\-a\-valid\-email/i)
    expect(emailError).toBeVisible()
  })

  it("should display 'This field is required' error when user focus out (blur event) the Password field", async () => {
    setup()

    const loginFormPasswordError = screen.queryByText(/this field is required/i)
    expect(loginFormPasswordError).not.toBeInTheDocument()

    const loginFormPasswordInput = screen.getByLabelText('password')
    await act(async () => {
      userEvent.clear(loginFormPasswordInput)
      fireEvent.blur(loginFormPasswordInput, { target: { value: '' } })
    })

    const loginPasswordError = screen.getAllByText(/this-field-is-required/i)
    expect(loginPasswordError[0]).toBeVisible()
  })
})
