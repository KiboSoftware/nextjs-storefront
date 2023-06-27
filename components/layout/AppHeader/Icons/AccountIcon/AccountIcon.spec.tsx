/* eslint-disable @typescript-eslint/no-var-requires */
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { mock } from 'jest-mock-extended'

import AccountIcon from './AccountIcon'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext, AuthContextType } from '@/context'

const setup = (isAuthenticated = false) => {
  const user = userEvent.setup()

  const mockValues = mock<AuthContextType>()
  mockValues.isAuthenticated = isAuthenticated
  mockValues.user = {
    id: 1001,
    firstName: 'John',
  }

  const handleAccountIconClickMock = jest.fn()
  renderWithQueryClient(
    <AuthContext.Provider value={mockValues}>
      <AccountIcon size="large" onAccountIconClick={handleAccountIconClickMock} />
    </AuthContext.Provider>
  )
  return {
    user,
    currentUser: mockValues.user,
    handleAccountIconClickMock,
  }
}

describe('[component] AccountIcon component', () => {
  it('should render the component for unauthenticated user', () => {
    setup()

    expect(screen.getAllByTestId('AccountCircleIcon')[0]).toBeVisible()
  })

  it('should render the component for authenticated user and display firstName', () => {
    const { currentUser } = setup(true)

    expect(screen.getAllByTestId('AccountCircleIcon')[0]).toBeVisible()
    expect(screen.getByText(`hi, ${currentUser.firstName}`)).toBeVisible()
  })

  it('should call handleAccountIconClick function', async () => {
    const { user, handleAccountIconClickMock } = setup()

    user.click(screen.getAllByTestId('AccountCircleIcon')[0])
    await waitFor(() => {
      expect(handleAccountIconClickMock).toBeCalled()
    })
  })
})
