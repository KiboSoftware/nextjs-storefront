import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { KiboDialogProps } from '../../../common/KiboDialog/KiboDialog'
import * as stories from './RegisterAccountDialog.stories' // import all stories from the stories file
import { ModalContextProvider } from '@/context/ModalContext'

const { Common } = composeStories(stories)

jest.mock('@/components/layout/RegisterAccount/Content/Content', () => ({
  __esModule: true,
  default: () => <div data-testid="register-account-content-component" />,
}))

jest.mock('@/components/common/KiboDialog/KiboDialog', () => ({
  __esModule: true,
  default: (props: KiboDialogProps) => {
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
  },
}))

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper: ModalContextProvider })
}

describe('[components] Register Account Dialog', () => {
  const setup = () => {
    const user = userEvent.setup()
    renderComponent()
    return { user }
  }

  it('should render component', async () => {
    const { user } = setup()

    const registerAccountDialog = screen.getByTestId('register-account-dialog')
    const registerAccountTitle = screen.getByText(/register-now/i)
    const registerAccountContentComponent = screen.getByTestId('register-account-content-component')
    const loginToYourAccountLink = screen.getByText(/login-to-your-account/i)

    await user.click(loginToYourAccountLink)

    expect(registerAccountDialog).toBeVisible()
    expect(registerAccountTitle).toBeVisible()
    expect(registerAccountContentComponent).toBeVisible()
    expect(loginToYourAccountLink).toBeVisible()
  })
})
