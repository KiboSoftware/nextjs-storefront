import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act } from '@testing-library/react'

import * as stories from './ProfileDetailsForm.stories' // import all stories from the stories file

const { NameForm, EmailForm, PasswordForm } = composeStories(stories)

const PasswordValidationMock = () => <input data-testid="password-validation-mock" />
jest.mock(
  '@/components/common/PasswordValidation/PasswordValidation',
  () => () => PasswordValidationMock()
)

describe('[component] - ProfileDetailsForm', () => {
  it('should render Names form', () => {
    render(<NameForm />)

    const firstNameInput = screen.getByRole('textbox', { name: 'first-name' })
    const lastNameInput = screen.getByRole('textbox', { name: 'last-name-or-sur-name' })

    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeVisible()
  })

  it('should render Names form with initial value', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<NameForm firstName="John" lastName="Doe" />)
    })

    const firstNameInput = screen.getByRole('textbox', { name: 'first-name' })
    const lastNameInput = screen.getByRole('textbox', { name: 'last-name-or-sur-name' })

    expect(firstNameInput).toHaveValue('John')
    expect(lastNameInput).toHaveValue('Doe')
  })

  it('should render Email form', () => {
    render(<EmailForm />)

    const emailInput = screen.getByRole('textbox', { name: 'email' })

    expect(emailInput).toBeVisible()
  })

  it('should render Email form with initial value', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<EmailForm emailAddress="test@email.com" />)
    })

    const emailInput = screen.getByRole('textbox', { name: 'email' })

    expect(emailInput).toHaveValue('test@email.com')
  })

  it('should render Password form', async () => {
    render(<PasswordForm />)

    const currentPassword = await screen.findByLabelText('current-password')
    const newPassword = await screen.findByLabelText('new-password')
    const confirmPassword = await screen.findByLabelText('confirm-password')

    expect(currentPassword).toBeVisible()
    expect(newPassword).toBeVisible()
    expect(confirmPassword).toBeVisible()

    expect(screen.getByTestId('password-validation-mock')).toBeVisible()
  })
})
