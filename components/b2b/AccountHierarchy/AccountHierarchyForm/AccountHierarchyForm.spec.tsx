import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyForm.stories' // import all stories from the stories file
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'

import { B2BUser } from '@/lib/gql/types'

const { Common, AddAccountToChild, EditAccount } = composeStories(stories)

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

describe('[component] Account Hierarchy Form', () => {
  it('should render component', async () => {
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
    render(<Common {...Common.args} onSave={onSave} onClose={onClose} />)

    const companyNameField: HTMLInputElement = screen.getByLabelText('company-name')
    const taxIdField: HTMLInputElement = screen.getByLabelText('tax-id (optional)')
    const emaiAddressField: HTMLInputElement = screen.getByLabelText('email')
    const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
    const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')
    const submitButton = await screen.findByTestId('submit-button')

    userEvent.type(companyNameField, 'ABC Enterprise')
    await waitFor(() => expect(companyNameField.value).toBe('ABC Enterprise'))
    userEvent.type(taxIdField, '123234')
    await waitFor(() => expect(taxIdField.value).toBe('123234'))
    userEvent.type(emaiAddressField, 'aman.shukla@gmail.com')
    await waitFor(() => expect(emaiAddressField.value).toBe('aman.shukla@gmail.com'))
    userEvent.type(firstNameField, 'Aman')
    await waitFor(() => expect(firstNameField.value).toBe('Aman'))
    userEvent.type(lastNameField, 'Shukla')
    await waitFor(() => expect(lastNameField.value).toBe('Shukla'))

    userEvent.click(submitButton)
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))
  })

  it('should populate form fields when b2BAccount prop is provided', async () => {
    render(<EditAccount onSave={onSave} />)
    const { companyOrOrganization, taxId, users } = b2BAccountHierarchyResult.accounts[0]
    const { firstName, lastName, emailAddress } = users?.[0] as B2BUser
    const companyOrOrganizationField: HTMLInputElement = screen.getByLabelText('company-name')
    const taxIdField: HTMLInputElement = screen.getByLabelText('tax-id (optional)')
    const emailAddressField: HTMLInputElement = screen.getByLabelText('email')
    const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
    const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')
    const submitButton = await screen.findByTestId('submit-button')

    expect(companyOrOrganizationField.value).toBe(companyOrOrganization)
    expect(taxIdField.value).toBe(taxId)
    expect(firstNameField.value).toBe(firstName)
    expect(lastNameField.value).toBe(lastName)
    expect(emailAddressField.value).toBe(emailAddress)

    userEvent.click(submitButton)
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))
  })

  it('should call onClose callback function when user clicks on Cancel button', async () => {
    render(<Common {...Common.args} onSave={onSave} onClose={onClose} />)

    const cancelButton = await screen.findByTestId('cancel-button')
    userEvent.click(cancelButton)
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1))
  })
})
