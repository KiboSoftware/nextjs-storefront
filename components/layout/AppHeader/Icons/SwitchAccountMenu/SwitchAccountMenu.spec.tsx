/* eslint-disable @typescript-eslint/no-var-requires */
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import SwitchAccountMenu from './SwitchAccountMenu'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext, AuthContextType } from '@/context'

const setup = () => {
  const user = userEvent.setup()

  const handleCloseMock = jest.fn()
  const mockValues = mock<AuthContextType>()
  mockValues.selectedAccountId = 1
  mockValues.accountsByUser = [1]
  mockValues.setUser = jest.fn()
  mockValues.setSelectedAccountId = jest.fn()
  mockValues.user = {
    id: 1,
    firstName: 'John',
    emailAddress: 'user1@example.com',
    companyOrOrganization: 'Company 1',
  }

  renderWithQueryClient(
    <AuthContext.Provider value={mockValues}>
      <SwitchAccountMenu open={true} anchorEl={null} handleClose={handleCloseMock} />
    </AuthContext.Provider>
  )
  return {
    user,
    selectedAccountId: mockValues.selectedAccountId,
    setSelectedAccountId: mockValues.setSelectedAccountId,
    setUser: mockValues.setUser,
    handleCloseMock,
  }
}

// jest.mock('@/hooks', () => ({
//   useGetAccountsByUser: jest.fn().mockImplementation(() => ({
//     activeUsersAccount: [
//       { id: 1, companyOrOrganization: 'Company 1', emailAddress: 'user1@example.com' },
//       { id: 2, companyOrOrganization: 'Company 2', emailAddress: 'user2@example.com' },
//     ],
//     isLoading: false,
//   })),
// }))

describe('[component] SwitchAccountMenu component', () => {
  it('should render the component', () => {
    setup()
    expect(screen.getByText('Company 1')).toBeInTheDocument()
    //expect(screen.getByText('Company 2')).toBeInTheDocument()
  })

  it('should call handleMenuItemClick with correct id when a menu item is clicked', async () => {
    const { user, setSelectedAccountId, setUser } = setup()

    const menuItem = screen.getByText('Company 1')
    user.click(menuItem)

    await new Promise(setImmediate) // Wait for any pending promises

    expect(setSelectedAccountId).toHaveBeenCalledWith(1)
    expect(setUser).toHaveBeenCalled()
  })

  it('applies the selected style to the selected menu item', () => {
    setup()

    const selectedMenuItem = screen.getByText('Company 1')
    expect(selectedMenuItem).toHaveClass('Mui-selected')
  })

  it('calls handleClose when the menu is closed', () => {
    const { user, handleCloseMock } = setup()

    user.click(screen.getByRole('menu'))

    expect(handleCloseMock).toHaveBeenCalled()
  })
})
