/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './LoginContent.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onForgotPasswordClickMock = jest.fn()
const onLoginMock = jest.fn()

beforeEach(() => jest.resetAllMocks())

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
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: 'remember-me' })
    const loginButton = screen.getByRole('button', { name: 'log-in' })
    const forgotPasswordLink = screen.getByRole('button', { name: 'forgot-password' })

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(eyeIcon).toBeVisible()
    expect(rememberMeCheckbox).toBeInTheDocument()
    expect(loginButton).toBeVisible()
    expect(loginButton).toBeDisabled()
    expect(forgotPasswordLink).toBeVisible()
  })

  it('should show user entered email', async () => {
    const { user } = setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    user.type(emailInput, email)
    user.tab()

    await waitFor(() => expect(emailInput).toHaveValue(email))
  })

  it('should show user entered password', async () => {
    const { user } = setup()
    const passwordInput = screen.getByLabelText('password')
    user.type(passwordInput, 'abc')
    user.tab()

    await waitFor(() => expect(passwordInput).toHaveValue('abc'))
  })

  it('should enable login button and call onLoginMock when user enters valid credentials and clicks on Login button', async () => {
    const { user } = setup()

    // valid inputs
    await loginInputs(user)

    const loginButton = screen.getByRole('button', { name: 'log-in' })
    await waitFor(() => expect(loginButton).toBeEnabled())

    user.click(loginButton)
    await waitFor(() =>
      expect(onLoginMock).toHaveBeenCalledWith({
        formData: {
          email: 'example@example.com',
          password: 'abc', //NOSONAR
        },
        isRememberMe: false,
      })
    )
  })

  it('should call onForgotPasswordClickMock callback function when user clicks on forgotPasswordLink', async () => {
    const { user } = setup()
    const forgotPasswordLink = screen.getByRole('button', { name: 'forgot-password' })

    user.click(forgotPasswordLink)

    await waitFor(() => {
      expect(onForgotPasswordClickMock).toBeCalled()
    })
  })

  it('should login when user enters valid credentials and press enter key', async () => {
    const { user } = setup()
    await loginInputs(user)

    await waitFor(() => {
      user.keyboard('{Enter}')
      expect(onLoginMock).toHaveBeenCalled()
    })
  })

  it('should keep login button disable when user enters invalid credentials', async () => {
    const { user } = setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const loginButton = screen.getByRole('button', { name: 'log-in' })

    expect(loginButton).toBeDisabled()

    // invalid inputs
    user.type(emailInput, 'abcd-email')
    await waitFor(() => {
      user.type(passwordInput, 'abc')
    })

    await waitFor(() => expect(loginButton).toBeDisabled())
  })
})

const loginInputs = async (user: any) => {
  const emailInput = screen.getByRole('textbox', { name: 'email' })
  const passwordInput = screen.getByLabelText('password')

  await act(async () => {
    await user.type(emailInput, 'example@example.com')
    await waitFor(() => {
      user.type(passwordInput, 'abc')
    })
  })
}
