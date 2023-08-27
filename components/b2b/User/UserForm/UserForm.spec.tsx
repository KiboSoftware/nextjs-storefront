import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserForm.stories' // import all stories from the stories file

const { Common, WithProps } = composeStories(stories)

const user = userEvent.setup()

const onClose = jest.fn()
const onSave = jest.fn()

describe('[component] User Form', () => {
  it('should render user form', async () => {
    render(<Common {...Common.args} />)

    const emaiAddressField = screen.getByLabelText('email-address')
    const firstNameField = screen.getByLabelText('first-name')
    const lastNameField = screen.getByLabelText('last-name-or-sur-name')
    const submitButton = await screen.findByTestId('submit-button')
    const resetButton = await screen.findByTestId('reset-button')

    expect(emaiAddressField).toBeInTheDocument()
    expect(firstNameField).toBeInTheDocument()
    expect(lastNameField).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(resetButton).toBeInTheDocument()
  })

  it('should show values entered by user', async () => {
    render(<Common {...Common.args} onSave={onSave} onClose={onClose} />)

    const emaiAddressField: HTMLInputElement = screen.getByLabelText('email-address')
    const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
    const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')
    const submitButton = await screen.findByTestId('submit-button')

    user.type(emaiAddressField, 'aman.shukla@gmail.com')
    await waitFor(() => expect(emaiAddressField.value).toBe('aman.shukla@gmail.com'))
    user.type(firstNameField, 'Aman')
    await waitFor(() => expect(firstNameField.value).toBe('Aman'))
    user.type(lastNameField, 'Shukla')
    await waitFor(() => expect(lastNameField.value).toBe('Shukla'))

    user.click(submitButton)
    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1))
  })

  it('should show form in edit mode', async () => {
    render(<Common {...WithProps.args} />)

    const b2BUser = WithProps.args?.b2BUser

    const emaiAddressField: HTMLInputElement = screen.getByLabelText('email-address')
    const firstNameField: HTMLInputElement = screen.getByLabelText('first-name')
    const lastNameField: HTMLInputElement = screen.getByLabelText('last-name-or-sur-name')

    await waitFor(() => expect(emaiAddressField.value).toBe(b2BUser?.emailAddress))
    await waitFor(() => expect(firstNameField.value).toBe(b2BUser?.firstName))
    await waitFor(() => expect(lastNameField.value).toBe(b2BUser?.lastName))
  })

  it('should reset the form and call onClose', async () => {
    render(<Common {...WithProps.args} onSave={onSave} onClose={onClose} />)

    // Access the cancel button element
    const cancelButton = screen.getByTestId('reset-button')

    // Simulate a click on the cancel button
    fireEvent.click(cancelButton)

    // Assert that the onClose function has been called
    expect(onClose).toHaveBeenCalled()
  })
})
