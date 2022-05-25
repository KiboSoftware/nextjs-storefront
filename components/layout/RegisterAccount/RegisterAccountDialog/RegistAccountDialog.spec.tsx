import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { KiboDialogProps } from '../../../common/KiboDialog/KiboDialog'
import * as stories from './RegisterAccountDialog.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

// const RegisterAccountTitleMock = () => <div data-testid="register-account-title-component" />
const RegisterAccountContentMock = () => <div data-testid="register-account-content-component" />
// const RegisterAccountActionsMock = () => <div data-testid="register-account-actions-component" />
const RegisterAccountDialogMock = (props: KiboDialogProps) => {
  const { Title, Content, Actions } = props
  return (
    <div data-testid="register-account-dialog">
      {Title}
      <br />
      {Content}
      <br />
      {Actions}
      <br />
    </div>
  )
}

// jest.mock('../Title/Title', () => RegisterAccountTitleMock)
jest.mock('../Content/Content', () => RegisterAccountContentMock)
// jest.mock('../Actions/Actions', () => RegisterAccountActionsMock)
jest.mock('../../../common/KiboDialog/KiboDialog', () => RegisterAccountDialogMock)

describe('[components] Register Account Dialog', () => {
  const onLoginToYourAccountMock = jest.fn()
  const setup = (params = {}) =>
    render(
      <Common
        {...params}
        onDialogClose={onCloseMock}
        onLoginToYourAccount={onLoginToYourAccountMock}
      />
    )

  it('should render component', () => {
    setup({
      isOpen: true,
    })

    const registerAccountDialog = screen.getByTestId('register-account-dialog')
    // const registerAccountTitleComponent = screen.getByTestId('register-account-title-component')
    const registerAccountTitle = screen.getByText(/register-now/i)
    const registerAccountContentComponent = screen.getByTestId('register-account-content-component')
    // const registerAccountActionsComponent = screen.getByTestId('register-account-actions-component')
    const loginToYourAccountLink = screen.getByText(/login-to-your-account/i)

    userEvent.click(loginToYourAccountLink)

    expect(registerAccountDialog).toBeVisible()
    expect(registerAccountTitle).toBeVisible()
    expect(registerAccountContentComponent).toBeVisible()
    expect(loginToYourAccountLink).toBeVisible()
    expect(onLoginToYourAccountMock).toHaveBeenCalled()
    // expect(registerAccountActionsComponent).toBeInTheDocument()
  })
})
