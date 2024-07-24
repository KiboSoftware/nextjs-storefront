import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'
import '@testing-library/jest-dom'

import * as stories from './HamburgerMenu.stories' // import all stories from the stories file
import { AuthContext, AuthContextType } from '@/context'

const { Common } = composeStories(stories)

const SwitchAccountMenuMock = () => <div data-testid="SwitchAccountMenu-component" />
jest.mock(
  '@/components/layout/AppHeader/Icons/SwitchAccountMenu/SwitchAccountMenu',
  () => () => SwitchAccountMenuMock()
)

describe('[component] HamburgerMenu component', () => {
  it('should render all the list-items if isDrawerOpen props is true', () => {
    render(<Common {...Common.args} />)
    const menu = screen.getAllByRole('button')

    expect(menu.length).toBe(17)

    const requestAccountLink = screen.getByText('B2B Account Request')
    expect(requestAccountLink).toBeVisible()
  })

  it('should not render all the list-items if isDrawerOpen props is false', () => {
    render(<Common isDrawerOpen={false} />)

    expect(screen.queryByTestId('hamburger-menu')).not.toBeVisible()
  })

  it('should render all the list-items if isDrawerOpen props is true', () => {
    render(<Common isDrawerOpen={true} />)

    expect(screen.getByTestId('hamburger-menu')).toBeInTheDocument()
  })

  it('should render Login button/ My Profile section', async () => {
    const setIsDrawerOpenMock = jest.fn()
    const user = userEvent.setup()
    render(<Common {...Common.args} setIsDrawerOpen={setIsDrawerOpenMock} />)

    expect(screen.getByTestId('AccountCircleIcon')).toBeVisible()
    expect(screen.getByText(/my-account/i)).toBeVisible()

    user.click(screen.getByRole('button', { name: 'back-arrow-button' }))
    await waitFor(() => {
      expect(setIsDrawerOpenMock).toBeCalled()
    })
  })

  it('should open switch account menu when user clicks on arrow down icon if user logged in with multiple accounts', async () => {
    const user = userEvent.setup()
    const mockValues = mock<AuthContextType>()
    mockValues.selectedAccountId = 2
    mockValues.accountsByUser = [1, 2]

    render(
      <AuthContext.Provider value={mockValues}>
        <Common {...Common.args} />
      </AuthContext.Provider>
    )

    const downArrow = screen.getAllByTestId(/KeyboardArrowDownOutlinedIcon/i)[0]
    await user.click(downArrow)

    await waitFor(() => {
      const menu = screen.getByTestId('SwitchAccountMenu-component')
      expect(menu).toBeInTheDocument()
    })
  })
})
