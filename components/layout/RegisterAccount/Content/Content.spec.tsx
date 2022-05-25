import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Content.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onChange={onChangMock} />
const PasswordValidationMock = () => <div data-testid="password-validation-component" />
jest.mock('../../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)
jest.mock('../../../common/PasswordValidation/PasswordValidation', () => PasswordValidationMock)

describe('[components] Register Account(Content)', () => {
  const setup = (args = Common.args) => render(<Common {...args} />)

  it('should render component', () => {
    setup()

    const emailInput = screen.getAllByTestId(/text-box-mock/i)[0]
    const firstNameInput = screen.getAllByTestId(/text-box-mock/i)[1]
    const lastNameInput = screen.getAllByTestId(/text-box-mock/i)[2]
    const passwordInput = screen.getAllByTestId(/text-box-mock/i)[3]
    const createAccountButton = screen.getByRole('button', { name: /common:create-an-account/i })

    expect(emailInput).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(lastNameInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(createAccountButton).toBeVisible()
    expect(createAccountButton).toBeDisabled()
  })

  it('should show user entered values', async () => {
    setup()
    const email = screen.getAllByRole('textbox')[0]
    const firstName = screen.getAllByRole('textbox')[1]
    const lastName = screen.getAllByRole('textbox')[2]
    const passwordInput = screen.getAllByRole('textbox')[3]

    userEvent.type(email, 'a')
    userEvent.type(firstName, 'b')
    userEvent.type(lastName, 'c')
    userEvent.type(passwordInput, 'd')

    expect(onChangMock).toHaveBeenCalledTimes(4)
  })
})
