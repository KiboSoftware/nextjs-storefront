import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyForm.stories' // import all stories from the stories file
import { createQueryClientWrapper } from '@/__test__/utils'

const { Common, AddAccountToChild } = composeStories(stories)

const onClose = jest.fn()
const onSave = jest.fn()

const setup = () => {
  const user = userEvent.setup()
  render(<Common {...Common.args} />, {
    wrapper: createQueryClientWrapper(),
  })
  return {
    user,
  }
}

describe('[component] User Form', () => {
  it('should render user form', async () => {
    setup()

    const parentAccountField: HTMLInputElement = screen.getByRole('textbox', { name: '' })
    const companyNameField = screen.getByRole('textbox', { name: 'company-name' })
    const taxIdField = screen.getByRole('textbox', { name: 'tax-id (optional)' })
    const emaiAddressField = screen.getByRole('textbox', { name: 'email' })
    const firstNameField = screen.getByRole('textbox', { name: 'first-name' })
    const lastNameField = screen.getByRole('textbox', { name: 'last-name-or-sur-name' })
    const submitButton = await screen.findByTestId('submit-button')
    const cancelButton = await screen.findByTestId('cancel-button')

    expect(parentAccountField).toBeInTheDocument()
    await waitFor(() =>
      expect(parseInt(parentAccountField.value)).toBe(Common?.args?.accounts?.[0]?.id)
    )
    expect(companyNameField).toBeVisible()
    expect(taxIdField).toBeVisible()
    expect(emaiAddressField).toBeVisible()
    expect(firstNameField).toBeVisible()
    expect(lastNameField).toBeVisible()
    expect(submitButton).toBeVisible()
    expect(cancelButton).toBeVisible()
  })

  it('should show normal textbox when account added to child account', async () => {
    render(<Common {...AddAccountToChild.args} onSave={onSave} onClose={onClose} />)

    const companyNameField: HTMLInputElement = screen.getByRole('textbox', {
      name: 'parent-account',
    })

    await waitFor(() =>
      expect(companyNameField.value).toBe(
        AddAccountToChild?.args?.accounts?.[0]?.companyOrOrganization
      )
    )
  })

  it('should call onSave callback function when user clicks on Create Account button', async () => {
    const user = userEvent.setup()

    render(<Common {...Common.args} onSave={onSave} onClose={onClose} />)

    const companyNameField: HTMLInputElement = screen.getByLabelText('company-name')
    const taxIdField: HTMLInputElement = screen.getByLabelText('tax-id (optional)')
    const emaiAddressField: HTMLInputElement = screen.getByLabelText('email')
    const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
    const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')
    const submitButton = await screen.findByTestId('submit-button')

    user.type(companyNameField, 'ABC Enterprise')
    await waitFor(() => expect(companyNameField.value).toBe('ABC Enterprise'))
    user.type(taxIdField, '123234')
    await waitFor(() => expect(taxIdField.value).toBe('123234'))
    user.type(emaiAddressField, 'aman.shukla@gmail.com')
    await waitFor(() => expect(emaiAddressField.value).toBe('aman.shukla@gmail.com'))
    user.type(firstNameField, 'Aman')
    await waitFor(() => expect(firstNameField.value).toBe('Aman'))
    user.type(lastNameField, 'Shukla')
    await waitFor(() => expect(lastNameField.value).toBe('Shukla'))

    user.click(submitButton)
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))
  })

  it('should call onClose callback function when user clicks on Cancel button', async () => {
    const user = userEvent.setup()

    render(<Common {...Common.args} onSave={onSave} onClose={onClose} />)

    const cancelButton = await screen.findByTestId('cancel-button')
    user.click(cancelButton)
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
  })
})
