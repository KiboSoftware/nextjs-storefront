/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './LoginContent.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onForgotPasswordClickMock = jest.fn()
const onLoginMock = jest.fn()

describe('[components] (LoginContent)', () => {
  const email = 'test@gmail.com'

  const setup = (args = Common.args) => {
    const user = userEvent.setup()
    render(
      <Common {...args} onLogin={onLoginMock} onForgotPasswordClick={onForgotPasswordClickMock} />
    )
    return {
      user,
    }
  }

  it('should render component', async () => {
    setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const eyeIcon = screen.getByRole('button', { name: 'toggle icon visibility' })
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: 'common:remember-me' })
    const loginButton = screen.getByRole('button', { name: 'common:log-in' })
    const forgotPasswordLink = screen.getByRole('button', { name: 'common:forgot-password' })

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(eyeIcon).toBeVisible()
    expect(rememberMeCheckbox).toBeInTheDocument()
    expect(loginButton).toBeVisible()
    expect(loginButton).toBeDisabled()
    expect(forgotPasswordLink).toBeVisible()
  })

  it('should show entered email input ', async () => {
    setup()
    const emailInput = screen.getByRole('textbox', { name: 'email' })
    fireEvent.blur(emailInput, { target: { value: email } })
    await waitFor(() => expect(emailInput).toHaveValue(email))
  })

  it('should show entered password input', async () => {
    setup()
    const passwordInput = screen.getByLabelText('password')
    fireEvent.blur(passwordInput, { target: { value: 'abc' } })
    await waitFor(() => expect(passwordInput).toHaveValue('abc'))
  })

  it('should disable login button when user enters invalid inputs ', async () => {
    const { user } = setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const loginButton = screen.getByRole('button', { name: 'common:log-in' })

    expect(loginButton).toBeDisabled()

    // invalid inputs
    await act(async () => {
      await user.clear(emailInput)
      await user.type(emailInput, 'abcd-email')
      await user.clear(passwordInput)
      await user.type(passwordInput, 'abc')
    })
    expect(loginButton).toBeDisabled()
  })

  it('should enable login button when user enters valid inputs and  call onLoginMock when user click onLogin ', async () => {
    const { user } = setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const loginButton = screen.getByRole('button', { name: 'common:log-in' })

    // valid inputs
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'example@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'abc' } })
    })

    await waitFor(() => expect(loginButton).toBeEnabled())
    await act(async () => {
      await user.click(loginButton)
    })
    await waitFor(() => expect(onLoginMock).toHaveBeenCalled())
  })

  it('should call onForgotPasswordClickMock when click forgotPasswordLink', async () => {
    const { user } = setup()
    const forgotPasswordLink = screen.getByRole('button', { name: 'common:forgot-password' })
    await act(async () => {
      await user.click(forgotPasswordLink)
    })
    expect(onForgotPasswordClickMock).toBeCalled()
  })
})
