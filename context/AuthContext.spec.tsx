import React from 'react'

import { render, act, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import { QueryClient, QueryClientProvider } from 'react-query'

import { UserContext, AuthContextProvider, useAuthContext } from './AuthContext'
import { loginUserMock } from '@/__mocks__/stories/userMock'
import { useUserMutations } from '@/hooks'

const callbackFn = jest.fn()
const params = {
  formData: { email: 'sss@email.com', password: '' },
  isRememberMe: false,
}

describe('[context] - AuthContext', () => {
  const setup = (ui: any, { providerProps, ...renderOptions }: any) => {
    return render(<AuthContextProvider {...providerProps}>{ui}</AuthContextProvider>, renderOptions)
  }
  const wrapper = (props: any) => (
    <QueryClientProvider client={new QueryClient()}>
      <AuthContextProvider {...props} />
    </QueryClientProvider>
  )

  it('should isAuthenticated be false before login', async () => {
    setup(
      <UserContext.Consumer>
        {(value) => (
          <div>{value.isAuthenticated && <p data-testid="is-logged-in">Is Logged In</p>}</div>
        )}
      </UserContext.Consumer>,
      { wrapper }
    )
    const isLoggedIn = screen.queryByText('Is Logged In')
    expect(isLoggedIn).not.toBeInTheDocument()
  })

  describe('when using useAuthContext hook', () => {
    it('should set user after login', async () => {
      const userCredentials = {
        username: 'abcd@email.com',
        password: '',
      }

      let response = {}
      renderHook(
        () => async () => {
          const { mutate } = useUserMutations()
          mutate(userCredentials, {
            onSuccess: (account: any) => {
              response = account
              expect(account).toStrictEqual(loginUserMock.account)
            },
          })
        },
        {
          wrapper,
        }
      )

      const { result } = renderHook(() => useAuthContext(), { wrapper })

      act(() => {
        result.current.login(params, callbackFn)
        result.current.setUser(response)
      })

      expect(result.current.user).toEqual(response)
    })
  })
})
