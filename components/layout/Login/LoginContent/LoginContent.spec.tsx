/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import * as stories from './LoginContent.stories' // import all stories from the stories file
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext, AuthContextType } from '@/context'

const { Common } = composeStories(stories)

const onForgotPasswordClickMock = jest.fn()
const mockValues = mock<AuthContextType>()
mockValues.login.mockImplementation((params: any, onSuccessCallBack: () => void) => {
  onSuccessCallBack()
})

beforeEach(() => jest.resetAllMocks())

afterEach(() => cleanup())

describe('[components] LoginContent', () => {
  const email = 'user1@example.com'

  const setup = (args = Common.args) => {
    const user = userEvent.setup()

    renderWithQueryClient(
      <AuthContext.Provider value={mockValues}>
        <Common {...args} onForgotPasswordClick={onForgotPasswordClickMock} />
      </AuthContext.Provider>
    )

    return {
      user,
    }
  }

  it('should render component', async () => {
    setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const eyeIcon = screen.getByRole('button', { name: 'toggle icon visibility' })
    const rememberMeCheckbox = screen.getByRole('checkbox', { name: 'remember-me' })
    const loginButton = screen.getByRole('button', { name: 'log-in' })
    const forgotPasswordLink = screen.getByRole('button', { name: 'forgot-password' })

    expect(emailInput).toBeVisible()
    expect(passwordInput).toBeVisible()
    expect(eyeIcon).toBeVisible()
    expect(rememberMeCheckbox).toBeInTheDocument()
    expect(loginButton).toBeVisible()
    expect(loginButton).toBeDisabled()
    expect(forgotPasswordLink).toBeVisible()
  })

  it('should show user entered email', async () => {
    const { user } = setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    user.type(emailInput, 'user1@example.com')
    user.tab()

    await waitFor(() => expect(emailInput).toHaveValue(email))
  })

  it('should show user entered email and selected account Id', async () => {
    const { user } = setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    await user.type(emailInput, 'user1@example.com')
    user.tab()

    expect(emailInput).toHaveValue(email)

    const dropdownButton = await screen.findByRole('button', { name: /accounts/i })
    expect(dropdownButton).toBeVisible()
    await user.click(dropdownButton)

    const company1Option = await screen.findByRole('option', { name: 'Company 1' })
    expect(company1Option).toBeVisible()

    await user.click(company1Option)

    expect(dropdownButton).toHaveTextContent('Company 1')

    const dropdownInput = screen.getByRole('textbox', { name: '' })
    expect(dropdownInput).toHaveValue('1')
  })

  it('should show user entered password', async () => {
    const { user } = setup()
    const passwordInput = screen.getByLabelText('password')
    user.type(passwordInput, 'abc')
    user.tab()

    await waitFor(() => expect(passwordInput).toHaveValue('abc'))
  })

  it('should enable login button and call onLoginMock when user enters valid credentials and clicks on Login button', async () => {
    const { user } = setup()
    // valid inputs
    await loginInputs(user)

    const loginButton = screen.getByRole('button', { name: 'log-in' })
    await waitFor(() => expect(loginButton).toBeEnabled())

    user.click(loginButton)

    await waitFor(() =>
      expect(mockValues.login).toHaveBeenCalledWith(
        {
          formData: {
            email: 'user1@example.com',
            accountId: '1',
            password: 'abc', //NOSONAR
          },
          isRememberMe: false,
        },
        expect.any(Function)
      )
    )
  })

  it('should call onForgotPasswordClickMock callback function when user clicks on forgotPasswordLink', async () => {
    const { user } = setup()
    const forgotPasswordLink = screen.getByRole('button', { name: 'forgot-password' })

    user.click(forgotPasswordLink)

    await waitFor(() => {
      expect(onForgotPasswordClickMock).toBeCalled()
    })
  })

  it('should login when user enters valid credentials and press enter key', async () => {
    const { user } = setup()
    await loginInputs(user, true)

    await waitFor(() => {
      expect(mockValues.login).toHaveBeenCalledWith(
        {
          formData: {
            email: 'user1@example.com',
            accountId: '1',
            password: 'abc', //NOSONAR
          },
          isRememberMe: false,
        },
        expect.any(Function)
      )
    })
  })

  it('should keep login button disable when user enters invalid credentials', async () => {
    const { user } = setup()

    const emailInput = screen.getByRole('textbox', { name: 'email' })
    const passwordInput = screen.getByLabelText('password')
    const loginButton = screen.getByRole('button', { name: 'log-in' })

    expect(loginButton).toBeDisabled()

    // invalid inputs
    user.type(emailInput, 'abcd-email')
    await waitFor(() => {
      user.type(passwordInput, 'abcd')
    })

    await waitFor(() => expect(loginButton).toBeDisabled())
  })
})

const loginInputs = async (user: any, submitWithEnter?: boolean) => {
  const emailInput = screen.getByRole('textbox', { name: 'email' })
  const passwordInput = screen.getByLabelText('password')

  await user.type(emailInput, 'user1@example.com')

  await user.tab()

  const dropdownButton = await screen.findByRole('button', { name: /accounts/i })
  await user.click(dropdownButton)

  const company1Option = await screen.findByRole('option', { name: 'Company 1' })
  await user.click(company1Option)

  if (submitWithEnter) {
    await user.type(passwordInput, 'abc{enter}')
  } else {
    await user.type(passwordInput, 'abc')
  }
}
