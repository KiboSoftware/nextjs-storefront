/* eslint-disable  testing-library/no-unnecessary-act */

import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/layout/Login/LoginDialog/LoginDialog.stories'

const { Common } = composeStories(stories)

describe('[components] Login Dialog', () => {
  const onDialogCloseMock = jest.fn()

  const setup = (args = Common.args) => {
    render(<Common {...args} onClose={onDialogCloseMock} />)
  }

  it('should render component', () => {
    setup()
    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const eyeIcon = screen.getByRole('button', { name: 'toggle password visibility' })
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: 'Remember Me' })
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

  it('should call onDialogCloseMock when user clicks onClose', () => {
    setup()

    const closeIconButton = screen.getByRole('button', {
      name: /close/i,
    })
    userEvent.click(closeIconButton)

    expect(onDialogCloseMock).toHaveBeenCalled()
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
