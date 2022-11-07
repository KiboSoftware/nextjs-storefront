/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './LoginDialog.stories' // import all stories from the stories file
import { ModalContextProvider } from '@/context/ModalContext'

const { Common } = composeStories(stories)

const LoginContentMock = () => <input data-testid="kibo-login-content" />
jest.mock('../LoginContent/LoginContent', () => () => LoginContentMock())

const renderComponent = () => {
  return render(<Common {...Common.args} />, { wrapper: ModalContextProvider })
}

describe('[components] (LoginDialog)', () => {
  const setup = () => {
    const user = userEvent.setup()
    renderComponent()
    return {
      user,
    }
  }

  it('should render component', async () => {
    const { user } = setup()
    const title = screen.getByText('log-in')
    const closeIcon = screen.getByRole('button', { name: 'close' })
    const loginContent = screen.getByTestId('kibo-login-content')

    expect(title).toBeVisible()
    expect(closeIcon).toBeVisible()
    expect(loginContent).toBeVisible()

    const registerNowLink = screen.getByRole('button', { name: 'register-now' })
    expect(registerNowLink).toBeVisible()

    await act(async () => {
      await user.click(registerNowLink)
    })
  })
})
