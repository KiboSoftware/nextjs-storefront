import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within } from '@testing-library/react'

import * as stories from './UserForm.stories' // import all stories from the stories file

const { AddUserForm } = composeStories(stories)

describe('[component] User Form', () => {
  it('should render user form', async () => {
    render(<AddUserForm {...AddUserForm.args} />)

    const emaiAddressField = screen.getByLabelText(/email-address/)
    const firstNameField = screen.getByLabelText(/first-name/)
    const lastNameField = screen.getByLabelText(/last-name-or-sur-name/)

    expect(emaiAddressField).toBeInTheDocument()
    expect(firstNameField).toBeInTheDocument()
    expect(lastNameField).toBeInTheDocument()
  })
})
