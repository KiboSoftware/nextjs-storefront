import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Content.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[components] Register Account(Content)', () => {
  const setup = (args = Common.args) => {
    const onRegisterToYourAccountMock = jest.fn()
    render(<Common {...args} onRegisterToYourAccount={onRegisterToYourAccountMock} />)
    return { onRegisterToYourAccountMock }
  }

  it('should render component', () => {
    setup()

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const firstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    const lastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const createAccountButton = screen.getByRole('button', { name: /common:create-an-account/i })

    expect(emailInput).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(createAccountButton).toBeVisible()
    expect(createAccountButton).toBeDisabled()
  })

  it('should create new account when user click on createAccount button', async () => {
    const { onRegisterToYourAccountMock } = setup()

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const registerAccountFormFirstNameInput = screen.getByRole('textbox', { name: /first-name/i })
    const registerAccountFormLastNameInput = screen.getByRole('textbox', { name: /last-name/i })
    const registerAccountFormPasswordInput = screen.getByLabelText(/password/i)
    const createAccountButton = screen.getByRole('button', { name: /common:create-an-account/i })

    fireEvent.change(emailInput, { target: { value: 'example@example.com' } })
    fireEvent.change(registerAccountFormFirstNameInput, { target: { value: 'Example' } })
    fireEvent.change(registerAccountFormLastNameInput, { target: { value: 'Example' } })
    fireEvent.change(registerAccountFormPasswordInput, { target: { value: 'Example@1234' } })

    await waitFor(() => expect(createAccountButton).toBeEnabled())
    userEvent.click(createAccountButton)
    await waitFor(() => expect(onRegisterToYourAccountMock).toHaveBeenCalled())
  })
})
