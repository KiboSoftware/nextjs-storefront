/* eslint-disable @typescript-eslint/no-var-requires */
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import SwitchAccountMenu from './SwitchAccountMenu'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext, AuthContextType } from '@/context'

const mockValues = mock<AuthContextType>()
mockValues.setSelectedAccountId = (accountId) => null
mockValues.setUser = jest.fn()
mockValues.user = {
  id: 1,
  firstName: 'John',
  emailAddress: 'user1@example.com',
  companyOrOrganization: 'Company 1',
}

const setup = () => {
  const user = userEvent.setup()

  const handleCloseMock = jest.fn()

  renderWithQueryClient(
    <AuthContext.Provider value={mockValues}>
      <SwitchAccountMenu open={true} anchorEl={null} handleClose={handleCloseMock} />
    </AuthContext.Provider>
  )
  return {
    user,
    handleCloseMock,
  }
}

describe('[component] SwitchAccountMenu component', () => {
  it('should render the component', async () => {
    setup()

    const menuItems = await screen.findAllByRole('menuitem')
    expect(menuItems).toHaveLength(2)
    expect(menuItems[0]).toHaveTextContent('Company 1')
    expect(menuItems[1]).toHaveTextContent('Company 2')
    expect(menuItems[0]).toHaveClass('Mui-selected')
  })

  // it('should call handleMenuItemClick with correct id when a menu item is clicked', async () => {
  //   const { user } = setup()

  //   const menu = screen.getByRole('menu')
  //   user.click(menu)

  //   const menuItems = await screen.findAllByRole('menuitem')
  //   expect(menuItems).toHaveLength(2)
  //   expect(menuItems[0]).toHaveTextContent('Company 1');
  //   expect(menuItems[1]).toHaveTextContent('Company 2');

  //   await user.click(menuItems[1]);

  //   expect(menu).toHaveTextContent('Company 2');

  //   expect(mockValues.setSelectedAccountId).toHaveBeenCalledWith(1)
  //   expect(mockValues.setUser).toHaveBeenCalled()
  // })

  it('calls handleClose when the menu is closed', async () => {
    const { user, handleCloseMock } = setup()

    const menu = screen.getByRole('menu')
    user.click(menu)
    const menuItems = await screen.findAllByRole('menuitem')
    expect(menuItems[0]).toHaveTextContent('Company 1')
    user.click(menu)
    expect(handleCloseMock).toHaveBeenCalled()
  })
})
