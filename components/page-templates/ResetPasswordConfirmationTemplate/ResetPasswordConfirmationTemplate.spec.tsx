import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import * as stories from './ResetPasswordConfirmationTemplate.stories' // import all stories from the stories files/userMock'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  render(<Common {...Common?.args} />)

  return {
    user,
  }
}

describe('[component] Reset Password Confirmation Template component', () => {
  it('should render the reset password confirmation component', () => {
    setup()

    const resetPasswordLabel = screen.getAllByText(/reset-password/i)[0]
    const passwordTexBox = screen.getByLabelText(/new-password/i)
    const confirmPasswordTexBox = screen.getByLabelText(/confirm-password/i)
    const resetPasswordButton = screen.getByRole('button', { name: 'reset-password' })

    expect(resetPasswordLabel).toBeVisible()
    expect(passwordTexBox).toBeVisible()
    expect(confirmPasswordTexBox).toBeVisible()
    expect(resetPasswordButton).toBeVisible()
  })

  it('validates and submits the form with valid data', async () => {
    const { user } = setup()

    const newPasswordInput = screen.getByLabelText(/new-password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm-password/i)
    const resetPasswordButton = screen.getByRole('button', { name: 'reset-password' })
    await act(async () => {
      await user.type(newPasswordInput, 'Password@123')
      await user.type(confirmPasswordInput, 'Password@123')
    })

    user.click(resetPasswordButton)

    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/',
      })
    })
  })

  it("should display 'Required Field Message' when user tabs out 'Password' field without entering Password", async () => {
    const { user } = setup()

    const newPasswordInput = screen.getByLabelText(/new-password/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm-password/i)

    await act(async () => {
      await user.type(newPasswordInput, 'Password@123')
      await user.type(confirmPasswordInput, 'Password123')
    })

    await waitFor(() => {
      const passwordError = screen.getByText(/it-should-match-your-new-password/i)
      expect(passwordError).toBeVisible()
    })
  })

  it('should unmusk password when click on eye icon', async () => {
    const { user } = setup()

    const eyeIcon = screen.getAllByRole('button', { name: 'toggle icon visibility' })[0]
    const passwordInput = screen.getByLabelText('new-password')

    expect(passwordInput).toHaveAttribute('type', 'password')

    user.click(eyeIcon)

    await waitFor(() => expect(passwordInput).toHaveAttribute('type', 'text'))
  })
})
