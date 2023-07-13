import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserForm.stories' // import all stories from the stories file

const { Common, WithProps } = composeStories(stories)

const onClose = jest.fn()

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
    render(<Common {...Common.args} />)

    const emaiAddressField = screen.getByLabelText('email-address') as HTMLInputElement
    const firstNameField = screen.getByLabelText('first-name') as HTMLInputElement
    const lastNameField = screen.getByLabelText('last-name-or-sur-name') as HTMLInputElement
    const submitButton = await screen.findByTestId('submit-button')

    userEvent.type(emaiAddressField, 'aman.shukla@gmail.com')
    await waitFor(() => expect(emaiAddressField.value).toBe('aman.shukla@gmail.com'))
    userEvent.type(firstNameField, 'Aman')
    await waitFor(() => expect(firstNameField.value).toBe('Aman'))
    userEvent.type(lastNameField, 'Shukla')
    await waitFor(() => expect(lastNameField.value).toBe('Shukla'))

    userEvent.click(submitButton)
  })

  it('should show form in edit mode', async () => {
    render(<Common {...WithProps.args} />)

    const b2BUser = WithProps.args?.b2BUser

    const emaiAddressField = screen.getByLabelText('email-address') as HTMLInputElement
    const firstNameField = screen.getByLabelText('first-name') as HTMLInputElement
    const lastNameField = screen.getByLabelText('last-name-or-sur-name') as HTMLInputElement
    const resetButton = await screen.findByTestId('reset-button')

    await waitFor(() => expect(emaiAddressField.value).toBe(b2BUser?.emailAddress))
    await waitFor(() => expect(firstNameField.value).toBe(b2BUser?.firstName))
    await waitFor(() => expect(lastNameField.value).toBe(b2BUser?.lastName))
  })
})
