import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
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

    const emailInput = screen.getAllByRole('textbox')[0]
    const firstNameInput = screen.getAllByRole('textbox')[1]
    const lastNameInput = screen.getAllByRole('textbox')[2]
    const passwordInput = screen.getByRole('button', { name: /toggle password visibility/i })
    const createAccountButton = screen.getByRole('button', { name: /common:create-an-account/i })

    expect(emailInput).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(createAccountButton).toBeVisible()
    expect(createAccountButton).toBeDisabled()
  })
})
