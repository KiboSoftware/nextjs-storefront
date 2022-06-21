import React from 'react'

import { render, act, screen, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { UserContext, AuthContextProvider, useAuthContext } from './AuthContext'
import { loginUserMock } from '@/__mocks__/stories/userMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'
import { useUserMutations } from '@/hooks'
import { QueryClient, QueryClientProvider } from 'react-query'
import { storeClientCookie } from '@/lib/helpers/cookieHelper'

// jest.mock('@/hooks', () => {
//   return {
//     // useUserMutations: () => {
//     //   return {
//     //     mutate: jest.fn(() => {
//     //       return { id: 3213, user: { firstName: 'Susanta' }, isAuthenticated: true }
//     //     }),
//     //   }
//     // },
//     useUserQueries: () => {
//       return {
//         loadUser: jest.fn(() => {
//           return { user: { id: 3213, firstName: 'Susanta' }, isAuthenticated: true }
//         }),
//       }
//     },
//   }
// })

const callbackFn = jest.fn()
const params = {
  formData: { email: 'sss@email.com', password: 'abcd' },
  isRememberMe: false,
}

const userData = {
  firstName: 'Susanta',
}
describe('[context] - AuthContext', () => {
  // const TestComp = () => {

  //   const context = useAuthContext()
  //   return (
  //     <>
  //       {context.isAuthenticated && <div data-testid="is-logged-in">Is logged in</div>}
  //       <button onClick={context.login(params, callbackFn)}>Login</button>
  //     </>
  //   )
  // }
  // render(<TestComp />)
  // test('UserGreeter salutes an anonymous user', () => {
  //   const isLoggedIn = screen.queryByTestId('is-logged-in')
  //   expect(isLoggedIn).not.toBeInTheDocument()
  // })
  // test('after login set user', async () => {
  //   const loginButton = screen.getByRole('button')
  //   userEvent.click(loginButton)
  //   await waitFor(() => {
  //     const isLoggedIn = screen.queryByTestId('is-logged-in')
  //     expect(isLoggedIn).toBeInTheDocument()
  //   })

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
        password: 'abcd1234',
      }

      const response = {}
      const { result: res } = renderHook(
        () => async () => {
          const { mutate } = useUserMutations()
          mutate(userCredentials, {
            onSuccess: (response: any) => {
              const account = response?.account
              response = account
              expect(account.customerAccount).toStrictEqual(loginUserMock.account)
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
