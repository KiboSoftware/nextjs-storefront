import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MyProfile.stories'

const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()

  render(<Common {...Common.args} />)

  return {
    user,
  }
}

describe('[components] MyProfile', () => {
  it('should render component', () => {
    setup()

    const customerNameLabel = screen.getByText(/customer-name/i)
    const customerName = screen.getByText(
      `${Common.args?.user?.firstName} ${Common.args?.user?.lastName}`
    )

    const emailLabel = screen.getByText(/email/i)
    const email = screen.getByText(Common.args?.user?.emailAddress as string)

    const passwordLabel = screen.getByText(/password/i)
    const editLink = screen.getAllByText(/edit/i)

    expect(customerNameLabel).toBeVisible()
    expect(customerName).toBeVisible()

    expect(emailLabel).toBeVisible()
    expect(email).toBeVisible()

    expect(passwordLabel).toBeVisible()
    expect(editLink).toHaveLength(3)
  })

  it(`should render names form if 'edit' button is clicked`, async () => {
    const { user } = setup()

    const editName = screen.getAllByText(/edit/i)
    user.click(editName[0])

    await waitFor(() => {
      const firstNameInput = screen.getByRole('textbox', { name: 'first-name' })
      expect(firstNameInput).toBeVisible()
    })

    await waitFor(() => {
      const lastNameInput = screen.getByRole('textbox', { name: 'last-name-or-sur-name' })
      expect(lastNameInput).toBeVisible()
    })
  })

  it(`should render email form if 'edit' button is clicked`, async () => {
    const { user } = setup()

    const editName = screen.getAllByText(/edit/i)
    user.click(editName[1])

    await waitFor(() => {
      const emailInput = screen.getByRole('textbox', { name: 'email' })
      expect(emailInput).toBeVisible()
    })
  })

  it(`should render password form if 'edit' button is clicked`, async () => {
    const { user } = setup()

    const editName = screen.getAllByText(/edit/i)
    user.click(editName[2])

    await waitFor(() => {
      const currentPassword = screen.getByLabelText('current-password')
      expect(currentPassword).toBeVisible()
    })

    const newPassword = screen.getByLabelText('new-password')
    expect(newPassword).toBeVisible()

    const confirmPassword = screen.getByLabelText('confirm-password')
    expect(confirmPassword).toBeVisible()
  })
})
