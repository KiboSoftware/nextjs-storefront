import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import { KiboDialogProps } from '../../../common/KiboDialog/KiboDialog'
import * as stories from './RegisterAccountModal.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const onCloseMock = jest.fn()

const RegisterAccountTitleMock = () => <div data-testid="register-account-title-component" />
const RegisterAccountContentMock = () => <div data-testid="register-account-content-component" />
const RegisterAccountActionsMock = () => <div data-testid="register-account-actions-component" />
const RegisterAccountModalMock = (props: KiboDialogProps) => {
  const { Title, Content, Actions } = props
  return (
    <div data-testid="register-account-modal">
      {Title}
      <br />
      {Content}
      <br />
      {Actions}
      <br />
    </div>
  )
}

jest.mock('../Title/Title', () => RegisterAccountTitleMock)
jest.mock('../Content/Content', () => RegisterAccountContentMock)
jest.mock('../Actions/Actions', () => RegisterAccountActionsMock)
jest.mock('../../../common/KiboDialog/KiboDialog', () => RegisterAccountModalMock)

describe('[components] Register Account Modal', () => {
  const setup = (params = {}) => render(<Common {...params} onClose={onCloseMock} />)

  it('should render component', () => {
    setup({
      isOpen: true,
    })

    const registerAccountDialog = screen.getByTestId('register-account-modal')
    const registerAccountTitleComponent = screen.getByTestId('register-account-title-component')
    const registerAccountContentComponent = screen.getByTestId('register-account-content-component')
    const registerAccountActionsComponent = screen.getByTestId('register-account-actions-component')

    expect(registerAccountDialog).toBeInTheDocument()
    expect(registerAccountTitleComponent).toBeInTheDocument()
    expect(registerAccountContentComponent).toBeInTheDocument()
    expect(registerAccountActionsComponent).toBeInTheDocument()
  })
})
