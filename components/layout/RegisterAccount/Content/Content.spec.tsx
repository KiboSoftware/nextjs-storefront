import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Content.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const PasswordValidationMock = () => <div data-testid="password-validation-component" />
const formDataMock = {
  email: 'example@example.com',
  firstName: 'Example',
  lastNameOrSurname: 'Example',
  password: 'Example@1234', //NOSONAR
}

jest.mock(
  '@/components/common/PasswordValidation/PasswordValidation',
  () => () => PasswordValidationMock()
)

describe('[components] Register Account(Content)', () => {
  const setup = () => {
    const onRegisterNowMock = jest.fn()
    const user = userEvent.setup()
    render(<Common setAutoFocus={false} onRegisterNow={onRegisterNowMock} />)
    return { onRegisterNowMock, user }
  }

  it('should render component', () => {
    setup()

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const firstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    const lastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const createAccountButton = screen.getByRole('button', { name: /create-an-account/i })

    expect(emailInput).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(createAccountButton).toBeVisible()
    expect(createAccountButton).toBeDisabled()
  })

  it('should create new account when user click on createAccount button', async () => {
    const { onRegisterNowMock, user } = setup()

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const registerAccountFormFirstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    const registerAccountFormLastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    const registerAccountFormPasswordInput = screen.getByLabelText(/password/i)
    const createAccountButton = screen.getByRole('button', { name: /create-an-account/i })

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } })
    fireEvent.change(registerAccountFormFirstNameInput, { target: { value: 'Example' } })
    fireEvent.change(registerAccountFormLastNameInput, { target: { value: 'Example' } })
    fireEvent.change(registerAccountFormPasswordInput, { target: { value: 'Example@1234' } })

    await waitFor(() => expect(createAccountButton).toBeEnabled())
    await user.click(createAccountButton)
    await waitFor(() => expect(onRegisterNowMock).toHaveBeenCalled())
    await waitFor(() => expect(onRegisterNowMock).toHaveBeenCalledWith(formDataMock))
  })

  it('should display password validations component when user make password filed dirty', async () => {
    setup()

    const registerAccountFormPasswordInput = screen.getByLabelText(/password/i)

    fireEvent.change(registerAccountFormPasswordInput, { target: { value: 'Example@1234' } })
    const passwordValidation = screen.getByTestId('password-validation-component')
    await waitFor(() => expect(passwordValidation).toBeInTheDocument())
  })
})
