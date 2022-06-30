import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { KiboDialogProps } from '../../../common/KiboDialog/KiboDialog'
import * as stories from './RegisterAccountDialog.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

const RegisterAccountContentMock = () => <div data-testid="register-account-content-component" />
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

jest.mock('../Content/Content', () => RegisterAccountContentMock)
jest.mock('../../../common/KiboDialog/KiboDialog', () => RegisterAccountDialogMock)

describe('[components] Register Account Dialog', () => {
  const onLoginToYourAccountMock = jest.fn()
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(
      <Common
        {...params}
        onDialogClose={onCloseMock}
        onLoginToYourAccountDialogToggle={onLoginToYourAccountMock}
      />
    )
    return {
      user,
    }
  }

  it('should render component', async () => {
    const { user } = setup({
      isOpen: true,
    })

    const registerAccountDialog = screen.getByTestId('register-account-dialog')
    const registerAccountTitle = screen.getByText(/register-now/i)
    const registerAccountContentComponent = screen.getByTestId('register-account-content-component')
    const loginToYourAccountLink = screen.getByText(/login-to-your-account/i)

    await user.click(loginToYourAccountLink)

    expect(registerAccountDialog).toBeVisible()
    expect(registerAccountTitle).toBeVisible()
    expect(registerAccountContentComponent).toBeVisible()
    expect(loginToYourAccountLink).toBeVisible()
    expect(onLoginToYourAccountMock).toHaveBeenCalled()
  })
})
