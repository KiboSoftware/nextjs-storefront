import React from 'react'

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import { AuthContextProvider, useAuthContext } from './AuthContext'
import { server } from '@/__mocks__/msw/server'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as cookieHelper from '@/lib/helpers/cookieHelper'

const mockOnSuccessCallBack = jest.fn()
const loginInputs = {
  formData: {
    email: 'abcd@eamil.com',
    password: '',
  },
  isRememberMe: false,
}
const registerInputs = {
  email: 'sukanta@email.com',
  firstName: 'Sunil',
  lastNameOrSurname: 'Tall',
  password: '',
}

jest.mock('@/lib/helpers/cookieHelper', () => ({
  __esModule: true,
  ...jest.requireActual('@/lib/helpers/cookieHelper'),
}))

describe('[context] - AuthContext', () => {
  const setup = (ui: any) => {
    const user = userEvent.setup()
    renderWithQueryClient(<AuthContextProvider>{ui}</AuthContextProvider>)
    return {
      user,
    }
  }
  const TestComponent = () => {
    const { isAuthenticated, authError, user, login, createAccount, logout } = useAuthContext()
    const loginUser = () => {
      login(loginInputs, mockOnSuccessCallBack)
    }
    const registerUser = () => {
      createAccount(registerInputs, mockOnSuccessCallBack)
    }

    return (
      <div>
        <div data-testid="is-logged-in">{isAuthenticated.toString()}</div>
        <div data-testid="auth-error">{authError}</div>
        <div data-testid="user-first-name">{user?.firstName}</div>
        <button name="login-button" onClick={loginUser}>
          Log in
        </button>
        <button name="register-button" onClick={registerUser}>
          Create account
        </button>
        <button name="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    )
  }

  it('should render initial context values', () => {
    setup(<TestComponent />)
    const isLoggedIn = screen.getByTestId('is-logged-in')
    const userFirstName = screen.getByTestId('user-first-name')
    const authError = screen.getByTestId('auth-error')

    expect(isLoggedIn).toHaveTextContent('false')
    expect(userFirstName).toHaveTextContent('')
    expect(authError).toHaveTextContent('')
  })

  describe('when using useAuthContext hook', () => {
    it('should set isAuthenticated to true when successfully logged in', async () => {
      const { user } = setup(<TestComponent />)
      const loginButton = screen.getByRole('button', { name: 'Log in' })
      const storeClientCookieFn = jest.spyOn(cookieHelper, 'storeClientCookie')
      const isLoggedIn = await screen.findByTestId('is-logged-in')
      const userFirstName = screen.getByTestId('user-first-name')

      await user.click(loginButton)
      const authError = await screen.findByTestId('auth-error')
      await waitFor(() => expect(isLoggedIn).toHaveTextContent('true'))
      await waitFor(() => expect(userFirstName).toHaveTextContent('Suman'))
      await waitFor(() => expect(authError).toHaveTextContent(''))
      await waitFor(() => expect(storeClientCookieFn).toHaveBeenCalled())
      await waitFor(() => expect(mockOnSuccessCallBack).toHaveBeenCalled())
    })
    it('should set isAuthenticated to true when successfully create a new account', async () => {
      const { user } = setup(<TestComponent />)
      const registerButton = screen.getByRole('button', { name: 'Create account' })
      const storeClientCookieSpy = jest.spyOn(cookieHelper, 'storeClientCookie')
      const isLoggedIn = await screen.findByTestId('is-logged-in')
      const userFirstName = screen.getByTestId('user-first-name')

      await user.click(registerButton)
      const authError = await screen.findByTestId('auth-error')
      await waitFor(() => expect(isLoggedIn).toHaveTextContent('true'))
      await waitFor(() => expect(userFirstName).toHaveTextContent('Sunil'))
      await waitFor(() => expect(authError).toHaveTextContent(''))
      await waitFor(() => expect(storeClientCookieSpy).toHaveBeenCalled())
      await waitFor(() => expect(mockOnSuccessCallBack).toHaveBeenCalled())
    })

    it('should show error when login request fails', async () => {
      server.resetHandlers(
        graphql.mutation('login', (_req, res, ctx) => {
          return res(ctx.status(403))
        }),
        graphql.query('getUser', (_req, res, ctx) => {
          return res(ctx.status(500))
        })
      )
      const { user } = setup(<TestComponent />)
      const loginButton = screen.getByRole('button', { name: 'Log in' })
      const userFirstName = screen.getByTestId('user-first-name')

      await user.click(loginButton)
      const isLoggedIn = await screen.findByTestId('is-logged-in')
      const authError = await screen.findByTestId('auth-error')
      expect(isLoggedIn).toHaveTextContent('false')
      expect(userFirstName).toHaveTextContent('')
      expect(authError).toHaveTextContent('Something Wrong !')
      expect(mockOnSuccessCallBack).not.toBeCalled()
    })

    it('should show error when create account fails', async () => {
      server.resetHandlers(
        graphql.mutation('registerUser', (_req, res, ctx) => {
          return res(ctx.status(403))
        }),
        graphql.query('getUser', (_req, res, ctx) => {
          return res(ctx.status(500))
        })
      )
      const { user } = setup(<TestComponent />)
      const registerButton = screen.getByRole('button', { name: 'Create account' })
      const userFirstName = screen.getByTestId('user-first-name')
      await user.click(registerButton)
      const isLoggedIn = await screen.findByTestId('is-logged-in')
      const authError = await screen.findByTestId('auth-error')
      expect(isLoggedIn).toHaveTextContent('false')
      expect(userFirstName).toHaveTextContent('')
      expect(authError).toHaveTextContent('Something Wrong !')
      expect(mockOnSuccessCallBack).not.toBeCalled()
    })

    it('should logout when click logout', async () => {
      const { user } = setup(<TestComponent />)
      const logoutButton = screen.getByRole('button', { name: 'Logout' })
      const removeClientCookieSpy = jest.spyOn(cookieHelper, 'removeClientCookie')

      await user.click(logoutButton)

      await waitFor(() => expect(removeClientCookieSpy).toHaveBeenCalled())
    })
  })
})
