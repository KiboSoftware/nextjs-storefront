import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Content.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const formDataMock = {
  email: 'example@example.com',
}
let isResetPasswordMock = false

describe('[components] Reset Password (Content)', () => {
  const setup = () => {
    const onResetPasswordMock = jest.fn()
    const user = userEvent.setup()
    render(
      <Common
        setAutoFocus={false}
        isResetPassword={isResetPasswordMock}
        onResetPassword={onResetPasswordMock}
      />
    )
    return { onResetPasswordMock, user }
  }

  it('should render component', () => {
    setup()

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const resetPasswordButton = screen.getByRole('button', { name: /reset-password/i })
    const resetPasswordMessage = screen.queryByText(/reset-password-message/i)

    expect(emailInput).toBeVisible()
    expect(resetPasswordButton).toBeVisible()
    expect(resetPasswordButton).toBeDisabled()
    expect(resetPasswordMessage).not.toBeInTheDocument()
  })

  it('should create new account when user click on reset password button', async () => {
    isResetPasswordMock = true
    const { onResetPasswordMock, user } = setup()

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const resetPasswordButton = screen.getByRole('button', { name: /reset-password/i })
    const resetPasswordMessage = screen.getByText(/reset-password-message/i)

    user.type(emailInput, 'example@example.com')

    await waitFor(() => expect(resetPasswordButton).toBeEnabled())
    user.click(resetPasswordButton)
    await waitFor(() => expect(onResetPasswordMock).toHaveBeenCalled())
    await waitFor(() => expect(onResetPasswordMock).toHaveBeenCalledWith(formDataMock))
    await waitFor(() => expect(resetPasswordMessage).toBeVisible())
  })
})
