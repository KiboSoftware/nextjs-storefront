/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboLoginContent.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onClickForgotPasswordMock = jest.fn()
const onClickLoginMock = jest.fn()

describe('[components] Login (KiboLoginContent)', () => {
  const email = 'Test@gmail.com'

  const setup = (args = Common.args) =>
    render(
      <Common
        {...args}
        onClickLogin={onClickLoginMock}
        onClickForgotPassword={onClickForgotPasswordMock}
      />
    )

  it('should render component and show entered input values', async () => {
    setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const eyeIcon = screen.getByRole('button', { name: 'toggle password visibility' })
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: 'Remember Me' })
    const loginBtn = screen.getByRole('button', { name: 'common:log-in' })
    const forgotPasswordLink = screen.getByRole('button', { name: 'common:forgot-password' })

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(eyeIcon).toBeVisible()
    expect(rememberMeCheckbox).toBeInTheDocument()
    expect(loginBtn).toBeVisible()
    expect(loginBtn).toBeDisabled()
    expect(forgotPasswordLink).toBeVisible()
  })

  it('should enable login btn if valid inputs are provided', async () => {
    setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const loginBtn = screen.getByRole('button', { name: 'common:log-in' })

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(loginBtn).toBeVisible()
    expect(loginBtn).toBeDisabled()

    await act(async () => {
      userEvent.clear(emailInput)
      userEvent.type(emailInput, email)
    })
    userEvent.type(passwordInput, 'b')

    await act(async () => {
      userEvent.clear(passwordInput)
      userEvent.type(passwordInput, 'abc')
    })
    expect(passwordInput).toHaveValue('abc')

    await act(async () => {
      userEvent.click(loginBtn)
    })
    expect(loginBtn).toBeEnabled()
    expect(onClickLoginMock).toBeCalled()

    await act(async () => {
      userEvent.clear(emailInput)
      userEvent.type(emailInput, 'dsfsd')
    })

    await act(async () => {
      userEvent.clear(passwordInput)
      userEvent.type(passwordInput, 'abc')
    })

    expect(loginBtn).toBeDisabled()
  })
  it('should fire event when forgot password link clicked..', async () => {
    setup()
    const forgotPasswordLink = screen.getByRole('button', { name: 'common:forgot-password' })
    await act(async () => {
      userEvent.click(forgotPasswordLink)
    })
    expect(onClickForgotPasswordMock).toBeCalled()
  })
})
