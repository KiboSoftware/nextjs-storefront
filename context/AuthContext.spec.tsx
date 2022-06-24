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

describe('[context] - AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = (ui: any) => {
    return renderWithQueryClient(<AuthContextProvider>{ui}</AuthContextProvider>)
  }
  const TestComponent = () => {
    const { isAuthenticated, authError, user, login } = useAuthContext()
    const loginUser = () => {
      login(loginInputs, mockOnSuccessCallBack)
    }

    return (
      <div>
        <div data-testid="is-logged-in">{isAuthenticated.toString()}</div>
        <div data-testid="auth-error">{authError}</div>
        <div data-testid="user-first-name">{user?.firstName}</div>
        <button name="login-button" onClick={loginUser}>
          Log in
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
    beforeEach(() => {
      jest.clearAllMocks()
    })
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should set isAuthenticated to true when successfully logged in', async () => {
      setup(<TestComponent />)
      const loginButton = screen.getByRole('button')
      const storeClientCookieSpy = jest.spyOn(cookieHelper, 'storeClientCookie')
      const isLoggedIn = await screen.findByTestId('is-logged-in')
      const userFirstName = screen.getByTestId('user-first-name')

      userEvent.click(loginButton)
      const authError = await screen.findByTestId('auth-error')
      await waitFor(() => expect(isLoggedIn).toHaveTextContent('true'))
      await waitFor(() => expect(userFirstName).toHaveTextContent('Suman'))
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
      setup(<TestComponent />)
      const loginButton = screen.getByRole('button')
      const userFirstName = screen.getByTestId('user-first-name')

      userEvent.click(loginButton)
      const isLoggedIn = await screen.findByTestId('is-logged-in')
      const authError = await screen.findByTestId('auth-error')
      expect(isLoggedIn).toHaveTextContent('false')
      expect(userFirstName).toHaveTextContent('')
      expect(authError).toHaveTextContent('Something Wrong !')
      expect(mockOnSuccessCallBack).not.toBeCalled()
    })
  })
})
